import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { ProgrammingLanguage } from '../../enum/ProgrammingLanguage.js';
import { DocumentationSource } from '../../enum/DocumentationSource.js';
import { Dictionary } from 'typescript-collections';
import '../../extensions/StringExtension.js';

export class DocumentationCommand implements ICommand {
  public readonly name: string = 'docs';
  public readonly description: string = 'Fetch documentation for FRC';

  private readonly WPILIB_API: Dictionary<ProgrammingLanguage, string> = new Dictionary<ProgrammingLanguage, string>();
  private readonly REVLIB_API: Dictionary<ProgrammingLanguage, string> = new Dictionary<ProgrammingLanguage, string>();
  private readonly CTRE_API: Dictionary<ProgrammingLanguage, string> = new Dictionary<ProgrammingLanguage, string>();

  private readonly WPILIB: string = '<https://docs.wpilib.org/en/stable/>';
  private readonly VIVID: string = '<https://frc-radio.vivid-hosting.net>';

  public constructor() {
    this.WPILIB_API.setValue(ProgrammingLanguage.CPP, '<https://github.wpilib.org/allwpilib/docs/release/cpp/index.html>');
    this.WPILIB_API.setValue(ProgrammingLanguage.JAVA, '<https://github.wpilib.org/allwpilib/docs/release/java/index.html>');
    this.WPILIB_API.setValue(ProgrammingLanguage.PYTHON, '<https://robotpy.readthedocs.io/projects/robotpy/en/stable/>');

    this.REVLIB_API.setValue(ProgrammingLanguage.CPP, '<https://codedocs.revrobotics.com/cpp/namespacerev.html>');
    this.REVLIB_API.setValue(ProgrammingLanguage.JAVA, '<https://codedocs.revrobotics.com/java/com/revrobotics/package-summary.html>');
    this.REVLIB_API.setValue(ProgrammingLanguage.PYTHON, '<https://robotpy.readthedocs.io/projects/rev/en/stable/rev.html>');

    this.CTRE_API.setValue(ProgrammingLanguage.CPP, '<https://api.ctr-electronics.com/phoenix6/release/cpp/>');
    this.CTRE_API.setValue(ProgrammingLanguage.JAVA, '<https://api.ctr-electronics.com/phoenix6/release/java/>');
    this.CTRE_API.setValue(ProgrammingLanguage.PYTHON, '<https://api.ctr-electronics.com/phoenix6/release/python/>');
  }


  public trigger(message: Message<boolean>): boolean {
    const content = message?.content?.toLowerCase()?.stripPunctuation() ?? '';
    return content.isFirstWord('doc') || content.isFirstWord('docs');
  }

  public async execute(message: Message<boolean>): Promise<void> {
    if (message?.content == null) return;

    const request = message.content.toLowerCase().stripPunctuation().trim();
    const language = this.getLanguage(request);
    const sources = this.getDocRequests(request);
    const reply = this.buildMessage(language, sources);
    message.reply(reply);
  }

  private buildLabviewMessage() {
    let message = 'There are limited online resources for Labview (most are embedded). As a result, all available docs have been included.';
    message += '\n';
    message += `- WPILIB: ${this.WPILIB}`;
    message += '\n';
    message += `- Vivid Radio: ${this.VIVID}`;
    return message;
  }

  private getLanguageText(language: ProgrammingLanguage): string {
    switch(language) {
    case ProgrammingLanguage.LABVIEW: return 'Labview';
    case ProgrammingLanguage.CPP: return 'C++';
    case ProgrammingLanguage.PYTHON: return 'Python';
    default: return 'Java';
    }
  }

  private buildMessage(language: ProgrammingLanguage, docs: DocumentationSource[]): string {
    if (language === ProgrammingLanguage.LABVIEW) return this.buildLabviewMessage();

    if (docs == null || docs.length == 0) {
      docs = [ DocumentationSource.WPILIB, DocumentationSource.CTRE, DocumentationSource.REV, DocumentationSource.VIVID ];
    }

    const languageText = this.getLanguageText(language);
    let message = `Here are the requested documentation links for the ${languageText} programming language.`;

    if (docs.includes(DocumentationSource.WPILIB)) {
      message += `\n- WPILib: ${this.WPILIB}`;
      message += `\n- WPILib API: ${this.WPILIB_API.getValue(language)}`;
    }

    if (docs.includes(DocumentationSource.CTRE)) {
      message += `\n- CTRE (Phoenix) API: ${this.CTRE_API.getValue(language)}`;
    }

    if (docs.includes(DocumentationSource.REV)) {
      message += `\n- REVLib API: ${this.REVLIB_API.getValue(language)}`;
    }

    if (docs.includes(DocumentationSource.VIVID)) {
      message += `\n- Vivid Hosting (Radio): ${this.VIVID}`;
    }

    return message;
  }

  private getLanguage(request: string): ProgrammingLanguage {
    if (request.includes('c++')) return ProgrammingLanguage.CPP;
    else if (request.includes('cpp')) return ProgrammingLanguage.CPP;
    else if (request.includes('labview')) return ProgrammingLanguage.LABVIEW;
    else if (request.includes('python')) return ProgrammingLanguage.PYTHON;
    else return ProgrammingLanguage.JAVA;
  }

  private getDocRequests(request: string): DocumentationSource[] {
    const sources : DocumentationSource[] = [];

    if (
      request.includes('wpi') 
            || request.includes('wpilib')
    ) sources.push(DocumentationSource.WPILIB);
        
    if (
      request.includes('rev') 
            || request.includes('revlib') 
            || request.includes('revrobotics')
            || request.includes('rev robotics')
    ) sources.push(DocumentationSource.REV);
        
    if (
      request.includes('ctr') 
            || request.includes('ctre') 
            || request.includes('ctrelectronics') 
            || request.includes('cross the road')
            || request.includes('cross the road electronics')
    ) sources.push(DocumentationSource.CTRE);

    if (
      request.includes('radio')
            || request.includes('vivid')
            || request.includes('network')
            || request.includes('networking')
    ) sources.push(DocumentationSource.VIVID);

    return sources;
  }
}