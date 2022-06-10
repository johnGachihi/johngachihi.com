import 'ace-builds/src-noconflict/mode-kotlin'

export default {
  name: "codeBlock",
  title: "Code Block",
  type: "code",
  options: {
    languageAlternatives: [
      { title: 'Javascript', value: 'js' },
      { title: 'Python', value: 'python' },
      { title: 'Kotlin', value: 'kotlin', mode: 'kotlin' },
      { title: 'HTML', value: 'html'}
    ]
  }
}