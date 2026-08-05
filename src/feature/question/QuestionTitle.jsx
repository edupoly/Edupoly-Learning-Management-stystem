import React from 'react'
import { Editor } from 'react-draft-wysiwyg';

function QuestionTitle({title='',handleQuestionTitle}) {
  return (
    <div className='p-2 border border-2 border-primary'>
      <b>Question Content</b>
      <Editor
        wrapperClassName="demo-wrapper"
        onEditorStateChange={handleQuestionTitle}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
}
export default QuestionTitle
