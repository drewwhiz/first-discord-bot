import { IFirstProgram } from '../models/IFirstProgram.js';

export class ProgramUtilities {
  public static mapProgramToCode(program: IFirstProgram): string {
    if (program == null) return null;
    switch (program) {
    case IFirstProgram.FRC: return 'FRC';
    case IFirstProgram.FTC: return 'FTC';
    case IFirstProgram.FLL: return 'FLL';
    case IFirstProgram.JFLL: return 'JFLL';
    }
  }
}