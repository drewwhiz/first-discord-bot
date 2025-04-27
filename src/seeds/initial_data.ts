import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('acronyms').del();
  await knex('brand_colors').del();
  await knex('vendors').del();

  await knex('acronyms')
    .insert(
      [
        { acronym: 'TSIMFD', case_sensitive: false, explanation: 'https://www.youtube.com/watch?v=b-CvLWbfZhU',                                                                                   is_channel_restricted: true },
        { acronym: 'FIRST',  case_sensitive: true,  explanation: 'For Inspiration and Recognition of Science and Technology',                                                                     is_channel_restricted: false },
        { acronym: 'FRC',    case_sensitive: false, explanation: '*FIRST* Robotics Competition',                                                                                                  is_channel_restricted: false },
        { acronym: 'FTC',    case_sensitive: false, explanation: '*FIRST* Tech Challenge',                                                                                                        is_channel_restricted: false },
        { acronym: 'FLL',    case_sensitive: false, explanation: '*FIRST* LEGO League',                                                                                                           is_channel_restricted: false },
        { acronym: 'FYSA',   case_sensitive: false, explanation: 'for your situational awareness',                                                                                                is_channel_restricted: false },
        { acronym: 'WPI',    case_sensitive: false, explanation: 'Worcester Polytechnic Institute',                                                                                               is_channel_restricted: false },
        { acronym: 'CTRE',   case_sensitive: false, explanation: 'Cross the Road Electronics',                                                                                                    is_channel_restricted: false },
        { acronym: 'CTR',    case_sensitive: false, explanation: 'Cross the Road Electronics',                                                                                                    is_channel_restricted: false },
        { acronym: 'CSA',    case_sensitive: false, explanation: 'Control System Advisor',                                                                                                        is_channel_restricted: false },
        { acronym: 'FTAA',   case_sensitive: false, explanation: '*FIRST* Technical Advisor Assistant',                                                                                           is_channel_restricted: false },
        { acronym: 'FTA',    case_sensitive: false, explanation: '*FIRST* Technical Advisor',                                                                                                     is_channel_restricted: false },
        { acronym: 'GA',     case_sensitive: false, explanation: 'Game Announcer',                                                                                                                is_channel_restricted: false },
        { acronym: 'MC',     case_sensitive: false, explanation: 'Emcee',                                                                                                                         is_channel_restricted: false },
        { acronym: 'RI',     case_sensitive: false, explanation: 'Robot Inspector',                                                                                                               is_channel_restricted: false },
        { acronym: 'LRI',    case_sensitive: false, explanation: 'Lead Robot Inspector',                                                                                                          is_channel_restricted: false },
        { acronym: 'JA',     case_sensitive: false, explanation: 'Judge Advisor',                                                                                                                 is_channel_restricted: false },
        { acronym: 'JAA',    case_sensitive: false, explanation: 'Judge Advisor Assistant',                                                                                                       is_channel_restricted: false },
        { acronym: 'VC',     case_sensitive: false, explanation: 'Volunteer Coordinator',                                                                                                         is_channel_restricted: false },
        { acronym: 'WTA',    case_sensitive: false, explanation: 'Wi-Fi Technical Advisor',                                                                                                       is_channel_restricted: false },
        { acronym: 'PDP',    case_sensitive: false, explanation: 'Program Delivery Partner or the Power Distribution Panel (CTRE <https://store.ctr-electronics.com/power-distribution-panel/>)', is_channel_restricted: false },
        { acronym: 'PDH',    case_sensitive: false, explanation: 'Power Distribution Hub (REV <https://www.revrobotics.com/rev-11-1850/>)',                                                       is_channel_restricted: false },
        { acronym: 'PCM',    case_sensitive: false, explanation: 'Pneumatic Control Module (CTRE <https://store.ctr-electronics.com/pneumatic-control-module/>)',                                 is_channel_restricted: false },
        { acronym: 'PH',     case_sensitive: false, explanation: 'Pneumatic Hub (REV <https://www.revrobotics.com/rev-11-1852/>)',                                                                is_channel_restricted: false },
        { acronym: 'VRM',    case_sensitive: false, explanation: 'Voltage Regulator Module (CTRE <https://store.ctr-electronics.com/voltage-regulator-module/>)',                                 is_channel_restricted: false },
        { acronym: 'RPM',    case_sensitive: false, explanation: 'Revolutions per minute or the Radio Power Module (REV <https://www.revrobotics.com/rev-11-1856/>)',                             is_channel_restricted: false },
        { acronym: 'GP',     case_sensitive: false, explanation: 'Gracious Professionalism',                                                                                                      is_channel_restricted: false },
        { acronym: 'TBA',    case_sensitive: false, explanation: 'The Blue Alliance (or To Be Announced)',                                                                                        is_channel_restricted: false },
        { acronym: 'KOP',    case_sensitive: false, explanation: 'Kit of Parts <https://www.firstinspires.org/robotics/frc/kit-of-parts>',                                                        is_channel_restricted: false },
        { acronym: 'TBD',    case_sensitive: false, explanation: 'To Be Determined',                                                                                                              is_channel_restricted: false },
        { acronym: 'GDC',    case_sensitive: false, explanation: 'Game Design Committee',                                                                                                         is_channel_restricted: false },
        { acronym: 'CAD',    case_sensitive: false, explanation: 'Computer Aided Design',                                                                                                         is_channel_restricted: false },
        { acronym: 'WFA',    case_sensitive: false, explanation: 'Woodie Flowers Award',                                                                                                          is_channel_restricted: false },
        { acronym: 'WFFA',   case_sensitive: false, explanation: 'Woodie Flowers Finalist Award',                                                                                                 is_channel_restricted: false },
        { acronym: 'DLA',    case_sensitive: false, explanation: 'Dean\'s List Award',                                                                                                             is_channel_restricted: false },
        { acronym: 'FIA',    case_sensitive: false, explanation: '*FIRST* Impact Award or *FIRST* in Alabama',                                                                                    is_channel_restricted: false },
        { acronym: 'COTS',   case_sensitive: false, explanation: 'Commercial Off The Shelf',                                                                                                      is_channel_restricted: false },
        { acronym: 'HR',     case_sensitive: false, explanation: 'Head Referee',                                                                                                                  is_channel_restricted: false },
        { acronym: 'HOF',    case_sensitive: false, explanation: 'Hall of Fame',                                                                                                                  is_channel_restricted: false },
        { acronym: 'RTFM',   case_sensitive: false, explanation: 'Read the *FIRST* Manual',                                                                                                       is_channel_restricted: false },
        { acronym: 'YMMV',   case_sensitive: false, explanation: 'Your Mileage May Vary',                                                                                                         is_channel_restricted: false },
        { acronym: 'PWM',    case_sensitive: false, explanation: 'Pulse Width Modulation',                                                                                                        is_channel_restricted: false },
        { acronym: 'DOA',    case_sensitive: false, explanation: 'Dead On Arrival',                                                                                                               is_channel_restricted: false },
        { acronym: 'EI',     case_sensitive: false, explanation: 'Engineering Inspiration (Award)',                                                                                               is_channel_restricted: false },
        { acronym: 'RD',     case_sensitive: false, explanation: 'Regional Director',                                                                                                             is_channel_restricted: false },
        { acronym: 'FSM',    case_sensitive: false, explanation: '*FIRST* Senior Mentor',                                                                                                         is_channel_restricted: false },
        { acronym: 'BOM',    case_sensitive: false, explanation: 'Bill of Materials',                                                                                                             is_channel_restricted: false },
        { acronym: 'CAN',    case_sensitive: false, explanation: 'Controller Area Network',                                                                                                       is_channel_restricted: false },
        { acronym: 'STIMS',  case_sensitive: false, explanation: 'Student Team Information Management System (<https://my.firstinspires.org/Dashboard/>)',                                        is_channel_restricted: false },
        { acronym: 'VMS',    case_sensitive: false, explanation: 'Volunteer Management System (<https://my.firstinspires.org/VMS/Login.aspx>)',                                                   is_channel_restricted: false },
        { acronym: 'OPR',    case_sensitive: false, explanation: 'Offensive Power Rating (<https://www.statbotics.io/blog/models>)',                                                              is_channel_restricted: false },
        { acronym: 'EPA',    case_sensitive: false, explanation: 'Expected Points Added (<https://www.statbotics.io/blog/models>)',                                                               is_channel_restricted: false }
      ]
    );

  await knex('brand_colors')
    .insert(
      [
        { brand: 'FIRST', hexcode: '#0066B3' },
        { brand: 'FIRST', hexcode: '#ED1C24' },
        { brand: 'FIRST', hexcode: '#9A989A' },
        { brand: 'FIRST', hexcode: '#231F20' },
        { brand: 'FLL',   hexcode: '#ED1C24' },
        { brand: 'FLL',   hexcode: '#231F20' },
        { brand: 'FLL',   hexcode: '#662D91' },
        { brand: 'FLL',   hexcode: '#00A651' },
        { brand: 'FTC',   hexcode: '#F57E25' },
        { brand: 'FTC',   hexcode: '#231F20' },
        { brand: 'FRC',   hexcode: '#009CD7' },
        { brand: 'FRC',   hexcode: '#231F20' },
        { brand: '10101', hexcode: '#010101' },
        { brand: '10101', hexcode: '#ffffff' },
        { brand: '10101', hexcode: '#00c1c1' },
        { brand: '10101', hexcode: '#f10101' },
        { brand: '10101', hexcode: '#fbca13' }
      ]
    );

  await knex('vendors')
    .insert(
      [
        { prefix: 'am-', url_format: 'https://www.andymark.com/{0}', source: 'AndyMark' },
        { prefix: 'rev-', url_format: 'https://www.revrobotics.com/{0}', source: 'REV Robotics' },
        { prefix: 'wcp-', url_format: 'https://wcproducts.com/products/{0}', source: 'West Coast Products' }
      ]
    );
};
