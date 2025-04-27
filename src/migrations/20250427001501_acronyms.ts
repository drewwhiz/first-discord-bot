import type { Knex } from "knex";

const TABLE_NAME = 'acronyms';

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('acronym');
    table.boolean('case_sensitive').defaultTo(false);
    table.text('explanation');
    table.boolean('is_channel_restricted').defaultTo(false);
  });
  
  knex(TABLE_NAME)
    .insert({ acronym: 'TSIMFD', case_sensitive: false, explanation: 'https://www.youtube.com/watch?v=b-CvLWbfZhU',                                                                                   is_channel_restricted: true })
    .insert({ acronym: 'FIRST',  case_sensitive: true,  explanation: 'For Inspiration and Recognition of Science and Technology',                                                                     is_channel_restricted: false })
    .insert({ acronym: 'FRC',    case_sensitive: false, explanation: '*FIRST* Robotics Competition',                                                                                                  is_channel_restricted: false })
    .insert({ acronym: 'FTC',    case_sensitive: false, explanation: '*FIRST* Tech Challenge',                                                                                                        is_channel_restricted: false })
    .insert({ acronym: 'FLL',    case_sensitive: false, explanation: '*FIRST* LEGO League',                                                                                                           is_channel_restricted: false })
    .insert({ acronym: 'FYSA',   case_sensitive: false, explanation: 'for your situational awareness',                                                                                                is_channel_restricted: false })
    .insert({ acronym: 'WPI',    case_sensitive: false, explanation: 'Worcester Polytechnic Institute',                                                                                               is_channel_restricted: false })
    .insert({ acronym: 'CTRE',   case_sensitive: false, explanation: 'Cross the Road Electronics',                                                                                                    is_channel_restricted: false })
    .insert({ acronym: 'CTR',    case_sensitive: false, explanation: 'Cross the Road Electronics',                                                                                                    is_channel_restricted: false })
    .insert({ acronym: 'CSA',    case_sensitive: false, explanation: 'Control System Advisor',                                                                                                        is_channel_restricted: false })
    .insert({ acronym: 'FTAA',   case_sensitive: false, explanation: '*FIRST* Technical Advisor Assistant',                                                                                           is_channel_restricted: false })
    .insert({ acronym: 'FTA',    case_sensitive: false, explanation: '*FIRST* Technical Advisor',                                                                                                     is_channel_restricted: false })
    .insert({ acronym: 'GA',     case_sensitive: false, explanation: 'Game Announcer',                                                                                                                is_channel_restricted: false })
    .insert({ acronym: 'MC',     case_sensitive: false, explanation: 'Emcee',                                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'RI',     case_sensitive: false, explanation: 'Robot Inspector',                                                                                                               is_channel_restricted: false })
    .insert({ acronym: 'LRI',    case_sensitive: false, explanation: 'Lead Robot Inspector',                                                                                                          is_channel_restricted: false })
    .insert({ acronym: 'JA',     case_sensitive: false, explanation: 'Judge Advisor',                                                                                                                 is_channel_restricted: false })
    .insert({ acronym: 'JAA',    case_sensitive: false, explanation: 'Judge Advisor Assistant',                                                                                                       is_channel_restricted: false })
    .insert({ acronym: 'VC',     case_sensitive: false, explanation: 'Volunteer Coordinator',                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'WTA',    case_sensitive: false, explanation: 'Wi-Fi Technical Advisor',                                                                                                       is_channel_restricted: false })
    .insert({ acronym: 'PDP',    case_sensitive: false, explanation: 'Program Delivery Partner or the Power Distribution Panel (CTRE <https://store.ctr-electronics.com/power-distribution-panel/>)', is_channel_restricted: false })
    .insert({ acronym: 'PDH',    case_sensitive: false, explanation: 'Power Distribution Hub (REV <https://www.revrobotics.com/rev-11-1850/>)',                                                       is_channel_restricted: false })
    .insert({ acronym: 'PCM',    case_sensitive: false, explanation: 'Pneumatic Control Module (CTRE <https://store.ctr-electronics.com/pneumatic-control-module/>)',                                 is_channel_restricted: false })
    .insert({ acronym: 'PH',     case_sensitive: false, explanation: 'Pneumatic Hub (REV <https://www.revrobotics.com/rev-11-1852/>)',                                                                is_channel_restricted: false })
    .insert({ acronym: 'VRM',    case_sensitive: false, explanation: 'Voltage Regulator Module (CTRE <https://store.ctr-electronics.com/voltage-regulator-module/>)',                                 is_channel_restricted: false })
    .insert({ acronym: 'RPM',    case_sensitive: false, explanation: 'Revolutions per minute or the Radio Power Module (REV <https://www.revrobotics.com/rev-11-1856/>)',                             is_channel_restricted: false })
    .insert({ acronym: 'GP',     case_sensitive: false, explanation: 'Gracious Professionalism',                                                                                                      is_channel_restricted: false })
    .insert({ acronym: 'TBA',    case_sensitive: false, explanation: 'The Blue Alliance (or To Be Announced)',                                                                                        is_channel_restricted: false })
    .insert({ acronym: 'KOP',    case_sensitive: false, explanation: 'Kit of Parts <https://www.firstinspires.org/robotics/frc/kit-of-parts>',                                                        is_channel_restricted: false })
    .insert({ acronym: 'TBD',    case_sensitive: false, explanation: 'To Be Determined',                                                                                                              is_channel_restricted: false })
    .insert({ acronym: 'GDC',    case_sensitive: false, explanation: 'Game Design Committee',                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'CAD',    case_sensitive: false, explanation: 'Computer Aided Design',                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'WFA',    case_sensitive: false, explanation: 'Woodie Flowers Award',                                                                                                          is_channel_restricted: false })
    .insert({ acronym: 'WFFA',   case_sensitive: false, explanation: 'Woodie Flowers Finalist Award',                                                                                                 is_channel_restricted: false })
    .insert({ acronym: 'DLA',    case_sensitive: false, explanation: "Dean's List Award",                                                                                                             is_channel_restricted: false })
    .insert({ acronym: 'FIA',    case_sensitive: false, explanation: '*FIRST* Impact Award or *FIRST* in Alabama',                                                                                    is_channel_restricted: false })
    .insert({ acronym: 'COTS',   case_sensitive: false, explanation: 'Commercial Off The Shelf',                                                                                                      is_channel_restricted: false })
    .insert({ acronym: 'HR',     case_sensitive: false, explanation: 'Head Referee',                                                                                                                  is_channel_restricted: false })
    .insert({ acronym: 'HOF',    case_sensitive: false, explanation: 'Hall of Fame',                                                                                                                  is_channel_restricted: false })
    .insert({ acronym: 'RTFM',   case_sensitive: false, explanation: 'Read the *FIRST* Manual',                                                                                                       is_channel_restricted: false })
    .insert({ acronym: 'YMMV',   case_sensitive: false, explanation: 'Your Mileage May Vary',                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'PWM',    case_sensitive: false, explanation: 'Pulse Width Modulation',                                                                                                        is_channel_restricted: false })
    .insert({ acronym: 'DOA',    case_sensitive: false, explanation: 'Dead On Arrival',                                                                                                               is_channel_restricted: false })
    .insert({ acronym: 'EI',     case_sensitive: false, explanation: 'Engineering Inspiration (Award)',                                                                                               is_channel_restricted: false })
    .insert({ acronym: 'RD',     case_sensitive: false, explanation: 'Regional Director',                                                                                                             is_channel_restricted: false })
    .insert({ acronym: 'FSM',    case_sensitive: false, explanation: '*FIRST* Senior Mentor',                                                                                                         is_channel_restricted: false })
    .insert({ acronym: 'BOM',    case_sensitive: false, explanation: 'Bill of Materials',                                                                                                             is_channel_restricted: false })
    .insert({ acronym: 'CAN',    case_sensitive: false, explanation: 'Controller Area Network',                                                                                                       is_channel_restricted: false })
    .insert({ acronym: 'STIMS',  case_sensitive: false, explanation: 'Student Team Information Management System (<https://my.firstinspires.org/Dashboard/>)',                                        is_channel_restricted: false })
    .insert({ acronym: 'VMS',    case_sensitive: false, explanation: 'Volunteer Management System (<https://my.firstinspires.org/VMS/Login.aspx>)',                                                   is_channel_restricted: false })
    .insert({ acronym: 'OPR',    case_sensitive: false, explanation: 'Offensive Power Rating (<https://www.statbotics.io/blog/models>)',                                                              is_channel_restricted: false })
    .insert({ acronym: 'EPA',    case_sensitive: false, explanation: 'Expected Points Added (<https://www.statbotics.io/blog/models>)',                                                               is_channel_restricted: false });
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(TABLE_NAME);
}

