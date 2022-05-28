/** @jsxImportSource @emotion/react */
import hljs from "highlight.js"
import "highlight.js/styles/intellij-light.css"
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import kotlin from 'highlight.js/lib/languages/kotlin';
import { useMemo } from "react";
import { css } from "@emotion/react";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('kotlin', kotlin);

type Props = {
  language: string,
  code: string,
}

function CodeBlock({ language, code }: Props) {
  const highlightedCode = useMemo(
    () => hljs.highlight(code, { language: language }),
    [language, code]
  )

  return (
    <div
      css={css`
        padding: 8px 24px;
        margin: 32px 0;
        border: 1px solid #afafaf;
        border-radius: 7px;
        font-size: 16px;
        overflow-x: auto;
      `}>
      <pre dangerouslySetInnerHTML={{ __html: highlightedCode.value }}></pre>
    </div>
  )
}

export default CodeBlock