<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="toggleReadOnly">{{ isReadOnly ? 'Enable Editing' : 'Enable ReadOnly' }}</v-btn>
  
    <ckeditor v-if="editor" :editor="editor" v-model="editorData" :config="editorConfig" ref="ckeditor" @ready="onReady"></ckeditor>      
   
  </div>
</template>

<script>
export default {
	name :"About",
	title : "About Page",
  data() {
    return {      
      editor: null,
      editorData: '<p>Initial editor content</p>',
      editorInstance: null,
      editorConfig: {      
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
      },
      isReadOnly: false,
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const ClassicEditor = require('../../src/components/CKEditor/build/ckeditor');
      const CKEditor = require('@ckeditor/ckeditor5-vue2');
      
      this.editor = ClassicEditor;    
      this.$options.components.ckeditor = CKEditor.component;
    }
  },
  methods: {
    onReady(editor) {
      this.editorInstance = editor;
      // 최소 높이 설정
      editor.editing.view.change(writer => {
        writer.setStyle('min-height', '200px', editor.editing.view.document.getRoot());
        writer.setStyle('max-height', '600px', editor.editing.view.document.getRoot());
        writer.setStyle('overflow', 'auto', editor.editing.view.document.getRoot());
      });
    },
    toggleReadOnly() {
      if (this.editorInstance) {
        this.isReadOnly = !this.isReadOnly;
        if (this.isReadOnly) {
          this.editorInstance.enableReadOnlyMode('customReadOnly');
        } else {
          this.editorInstance.disableReadOnlyMode('customReadOnly');
        }
      }
    },
  },

}
// Custom upload adapter plugin
function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new MyUploadAdapter( loader );
  };
}
// Custom upload adapter
class MyUploadAdapter {
  constructor( loader ) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then( file => new Promise( ( resolve, reject ) => {
        const reader = new FileReader();
        
        reader.onload = function() {
          resolve( {
            default: reader.result
          } );
        };

        reader.onerror = function( error ) {
          reject( error );
        };

        reader.readAsDataURL( file );
      } ) );
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
  }
}
</script>
