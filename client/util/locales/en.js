export default {
  common: {
    // all use English fallback for following
    adminPage: 'OSPA',
    about: 'About',
    // End of fallbacks
    logOut: 'Log out',
    backToFrontPage: 'Back to frontpage',
    chosenLanguage: 'English',
    form: 'Form',
    positive: 'No issues',
    neutral: 'Challenges identified and development underway',
    negative: 'Significant measures required/development areas not yet specified',
    noColors: '*Questions, without smileys are not shown here (e.g. 16 and 17)',
    green: 'Green',
    yellow: 'Yellow',
    red: 'Red',
    EMPTY: 'No answer provided',
    OK: 'Answer given',
    lastSaved: 'Last saved',

    faculty: 'Faculty',
    programmeHeader: 'Programme',
    code: 'Code',
    allProgrammes: 'All programmes',
    bachelor: "Bachelor's programmes",
    master: "Master's programmes",
    doctoral: 'Doctoral programmes',
    international: "International Master's programmes",
    programmeFilter: 'Search for study programmes',

    noData: 'No data available for these choices',
    selectAll: 'Select all',
    clearSelection: 'Clear selection',
    responses: 'Responses:',
    writtenAnswers: 'Written answers',
    smileyColors: ' Smiley colors',
  },

  aboutPage: {
    title: 'What is the Form?',
    whatIsIt: 'What is the self-assessment form?',
    whatIsItReply:
      'The Form is meant to act as a basis of the self-assessment discussion done by the steering group of each study programme. The Form is also used to document these discussions. The Form is being used in the University of Helsinki.',
    howToFillTitle: 'How should we fill in the form?',
    howToFill: `
    The questions are meant to arouse discussion around the respective topic, and each programme is suppose to write down the main points of that conversation. 
    Additionally, a separate list of measures is created for the programme itself, and another list regarding the measures for the faculty-wide planning.
    The programmes give also a general assessment of the situation via the colored smileys / traffic lights. These color answers are supposed to answer the question "Where are we now?" in relation
    to the subject at hand. The color answers are meant only as a conversation starter, thus no judgements or conclusions are drawn about the quality of the programme based on them. `,
    whatElseTitle: 'What else can I do with the form?',
    whatElse:
      "You can read the written documentation done by other programmes. With the reporting and comparison tools, you can also compare your assessments with the other programmes' assessments.",
    contactInfo: 'Questions? Contact ospa@helsinki.fi',
    broughtBy: 'Brought to you by:',
  },

  comparison: {
    compare: 'Compare answers',
    reportHeader: {
      byFaculty: 'Compare programme to a faculty',
      byYear: 'Compare answers by year',
    },
    selectYears: 'Select the year(s) you would like to inspect',
    filterFaculties: 'Filter by faculty',
    selectQuestions: 'Questions for comparison',
    writtenAnswers: 'Written answers by year',
    chosenProgrammes: 'Chosen programme',
    chooseProgramme: 'Choose a programme for comparison',
    compareFaculties: 'Compare by faculty',
    emptyAnswers: 'Include programmes without answers to the graphs',
    university: 'Entire university',
    noAccessToAll: 'Please note, that you can only see comparison with the programmes you have reading rights to',
    labelOptions: 'Unit in the graph',
    percentage: 'Percentages',
    programmeAmount: 'Amount of programmes',
  },

  formView: {
    title: 'DOCUMENTATION OF THE CURRENT STATUS OF DEGREE PROGRAMME',
    info1:
      'Please discuss the topics below in the steering group of the degree programme. The questions are intended to spark discussion, and the purpose is not to answer them as such.',
    info2:
      "Please provide an overall assessment of the programme's current status (“Where are we now?”) with regard to each topic using the following system of emoji:",
    downloadCSV: 'Download all data as a CSV file',
    downloadPDF: 'Print / Download answers as a PDF-file',
    mandatory: 'required field',
    saveFailed: 'Error: The changes you have made in the last 10 seconds have not been saved!',
    saveFailedInstructions:
      'In order to continue filling the form, please backup any recent changes you have made. Then click the button to reload the page.',
    reload: 'Reload the page',
    status: {
      locked: 'The form has been locked for the selected year and it cannot be edited.',
      open: 'form is open for editing.',
      canBeOpened: 'The owner of the form may still unlock the form before its deadline',
      deadlinePassed: 'The deadline to edit form has passed.',
      ospaProcessing: 'OSPA will process the answers.',
    },
    savingAnswers: 'Answers are saved automatically. Final day for answering the form:',
  },

  generic: {
    companionFilter: "Include faculty's partnership programmes to the answers",
    isWriting: 'is writing',
    allDoctoralSchools: 'All doctoral programmes',
    doctoralSchoolFilter: 'Filter by doctoral schools',
    socialSchool: 'Doctoral school in humanities and social sciences',
    sciencesSchool: 'Doctoral school in natural sciences',
    healthSchool: 'Doctoral school in health sciences',
    environmentalSchool: 'Doctoral school in environmental, food and biological sciences',
    textAreaLabel: 'Main points of discussion',
    allFaculties: 'All faculties',
    collapseText: 'Hide answers from last year',
    expandText: 'Show answers from last year',
    compareLevel: 'Compare by programme level',
    levelFilter: 'Filter by programme level',
    measureLabel: 'Add 1-5 measures',
    noPermissions:
      "You have no permissions for any study programmes. Please contact Strategic Services for Teaching or your study programme's leader.",
    nowShowing: 'NOW SHOWING THE ANSWERS OF',
    chooseMore: 'CHOOSE MORE PROGRAMMES:',
    tooLongPaste:
      'The text you are trying to paste ({{newLength}} characters in total) does not fit in the maximum character limit {{MAX_LENGTH}} characters)',
    year: 'Year(s)',
  },

  overview: {
    betterThanLastYear: 'Better than last year',
    worseThanLastYear: 'Worse than last year',
    formLocked: 'Form is locked',
    formUnlocked: 'Form can be edited',
    unlockForm: 'Unlock form',
    lockForm: 'Lock form (prevents editing)',
    overviewPage: 'Form - Overview',
    accessRights: 'Access Rights',
    selectYear: 'Select year to inspect',
    readAnswers: 'Read answers',
    compareAnswers: 'Compare answers',
    csvDownload: 'Download CSV',
    name: 'Name',
    view: 'Read',
    edit: 'Edit',
    owner: 'Owner',
    noUsers: 'No users',
    userListJory: 'Steering group members who have accessed the form',
    userListOthers: 'Other users who have programme access rights and have accessed the form',
  },

  report: {
    pdfNotification: 'Only the questions and answers chosen here will be printed on the PDF-report',
    facultyFilter: 'Filter by faculty',
    reportPage: 'Answers',
    selectQuestions: 'Filter out questions',
    clickToCheck: 'Check the written answers',
    question: 'Question',
    answered: 'Answered',
  },
}
