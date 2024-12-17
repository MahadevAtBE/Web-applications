"use client"
import React from 'react'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

// tip tap import 
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Code from '@tiptap/extension-code'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import History from '@tiptap/extension-history'


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { useForm } from 'react-hook-form';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



export default () => {

  const router = useRouter()  // to push routs

  // hook form 
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm()


  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Color, TextStyle, FontFamily, Bold, Italic, History, Highlight.configure({ multicolor: true }), Code, Strike, Subscript, Superscript, Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch (error) {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch (error) {
            return false
          }
        },

      }),
      Heading.configure({
        levels: [1, 2, 3, 4,],
      }),
      HardBreak,
      HorizontalRule,
      Image, Dropcursor, BulletList, OrderedList, ListItem,

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],

    content: `
      
      `,
  })

  // for url
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  // image adding 
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])


  if (!editor) {
    return null
  }

  const html = editor.getHTML()
  const onSubmit = async (data) => {
    data.htmlContent = html;   // tru to put html to the key value of data

    let r = await fetch('http://localhost:5001/blog/uploadBlog', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    console.log(r.status)
    if (r.status == 201) {
      reset();
      router.push("/blog")
    }

  }


  return (
    <>
      <div className='max-w-[95%] md:max-w-[80%] mx-auto'>
        <div className=" bg-teal-600 control-group flex md:flex-col justify-center border-2 border-black rounded-md my-4 dark:border-white">

          <div className="button-group hidden items-center justify-center gap-3 m-2 md:flex">
            {/* Undo button  */}
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
              <div title='Undo' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/undo.svg" alt="undo Icon" width={25} height={25} />
              </div>
            </button>

            {/* Redo button  */}
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
              <div title='Redo' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/redo.svg" alt="redo Icon"
                  width={25} height={25}
                />
              </div>
            </button>



            {/* font */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='Font' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/font.svg" alt="font Icon"
                        width={25} height={25}
                      />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[180px] p-5">
                    <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                        className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}
                        data-test-id="inter"
                      >
                        Inter
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
                        className={
                          editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })
                            ? 'is-active'
                            : ''
                        }
                        data-test-id="comic-sans"
                      >
                        Comic Sans
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('serif').run()}
                        className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}
                        data-test-id="serif"
                      >
                        Serif
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
                        className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}
                        data-test-id="monospace"
                      >
                        Monospace
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
                        className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}
                        data-test-id="cursive"
                      >
                        Cursive
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()}
                        className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''}
                        data-test-id="css-variable"
                      >
                        CSS variable
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()}
                        className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''}
                        data-test-id="comic-sans-quoted"
                      >
                        Comic Sans quoted
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setFontFamily('"Exo 2"').run()}
                        className={editor.isActive('textStyle', { fontFamily: '"Exo 2"' }) ? 'is-active' : ''}
                        data-test-id="exo2"
                      >
                        Exo 2
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().unsetFontFamily().run()}
                        data-test-id="unsetFontFamily">
                        Unset font family
                      </button>
                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>


            {/* heading */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='link' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/heading.svg" alt="heading Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink className="mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center">
                      <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                      >
                        H1<div className='text-slate-500'>Control+Alt+1</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                      >
                        H2<div className='text-slate-500'>Control+Alt+2</div>
                      </button>

                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                      >
                        H3<div className='text-slate-500'>Control+Alt+3</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                      >
                        H4<div className='text-slate-500'>Control+Alt+4</div>
                      </button>
                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* bold  */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <div title='Bold (Control+B)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/bold.svg" alt="bold Icon" width={15} height={15} />
              </div>
            </button>

            {/* italic  */}
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}>
              <div title='Italic (Control+I)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/italic.svg" alt="Italic Icon" width={15} height={15} />
              </div>
            </button>

            {/* underline  */}
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <div title='Underlone (Control+U)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/underline.svg" alt="underline Icon" width={15} height={15} />
              </div>
            </button>

            {/* text color  */}
            <div className=''>
              <input
                title='Color'
                type="color"
                onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                value={editor.getAttributes('textStyle').color}
                data-testid="setColor"
              />
            </div>

            {/* heilight  */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='Heilight (Control+Shift+H)' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/heilight.svg" alt="heilight Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-2'>
                    <NavigationMenuLink className='mt-1 m-3 text-[#ff0]'>
                      <input
                        className=''
                        title='Color'
                        type="color"
                        onInput={event => editor.commands.toggleHighlight({ color: event.target.value }).run()}
                        value={editor.getAttributes('textStyle').color}
                        data-testid="setColor"
                      />
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#ff0]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'is-active' : ''}
                      >
                        Yellow
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#ffc078]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
                        className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
                      >
                        Orange
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#8ce99a]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
                        className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
                      >
                        Green
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#74c0fc]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
                        className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}
                      >
                        Blue
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#b197fc]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
                        className={editor.isActive('highlight', { color: '#b197fc' }) ? 'is-active' : ''}
                      >
                        Purple
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 m-3 text-[#ffa8a8]'>
                      <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
                        className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}
                      >
                        Red
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink>

                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>



            {/* link  */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='link' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/link.svg" alt="link Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-2'>
                    <NavigationMenuLink className="text-[#ffa8a8]r flex items-center justify-center">
                      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                        Add
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                      >
                        Remove
                      </button>
                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>


            {/* image button  */}
            <button onClick={addImage}>
              <div title='Image' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/img.svg" alt="image Icon" width={25} height={25} />
              </div>
            </button>


            {/* list */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='List' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/list.svg" alt="list Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[120px] p-3">
                    <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                      <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                      >
                        Bullet list
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                      >
                        Ordered list
                      </button>

                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>


            {/* align */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='Align' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/align.svg" alt="align Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[120px] p-5">
                    <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                      <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                      >
                        Left<div className='text-slate-500'>Ctrl+Shift+L</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                      >
                        Center<div className='text-slate-500'>Ctrl+Shift+E</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                      >
                        Right<div className='text-slate-500'>Ctrl+Shift+R</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                      >
                        Justify<div className='text-slate-500'>Ctrl+Shift+J</div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>
                        Unset
                      </button>
                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>


            {/* Code button  */}
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}>
              <div title='Code (Control+E)' className='h-7 w-7 flex hover:bg-gray-200 items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/code.svg" alt="code Icon" width={25} height={15} />
              </div>
            </button>

            {/* Strike button  */}
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}>
              <div title='Strike (Control+Shift+S)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/strike.svg" alt="strike Icon" width={25} height={25} />
              </div>
            </button>

            {/* Subscript button  */}
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive('subscript') ? 'is-active' : ''}>
              <div title='Subscript (Control+,)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/subscript.svg" alt="subscript Icon" width={25} height={25} />
              </div>
            </button>

            {/* Superescript button  */}
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive('superscript') ? 'is-active' : ''}>
              <div title='Superscript (Control+.)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/superscript.svg" alt="superscript Icon" width={25} height={25} />
              </div>
            </button>


            {/* br  */}
            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
              <div title='Hard Break' className='h-7 w-7 text-xs hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full dark:text-black'>
                &lt;br&gt;
              </div>
            </button>

            {/* hr  */}
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <div title='Hard Break' className='h-7 w-7 text-xs hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full dark:text-black'>
                &lt;hr&gt;
              </div>
            </button>


            {/* table */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div title='Table' className='h-7 w-7 flex hover:bg-gray-200 items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                      <img src="/table.svg" alt="table Icon" width={25} height={25} />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] p-5">
                    <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                      <button
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                        }
                      >
                        Insert table
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
                        Add column before
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                        Toggle header column
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                        Toggle header row
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                        Toggle header cell
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                        Set cell attribute
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                        Go to previous cell
                      </button>
                    </NavigationMenuLink>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>



            {/* </div> */}
          </div>


          <div className="button-group flex items-center justify-center gap-3 m-2 bg-blue-300r md:hidden">
            {/* Undo button  */}
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
              <div title='Undo' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/undo.svg" alt="undo Icon" width={25} height={25} />
              </div>
            </button>


            {/* bold  */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <div title='Bold (Control+B)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/bold.svg" alt="bold Icon" width={15} height={15} />
              </div>
            </button>

            {/* italic  */}
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}>
              <div title='Italic (Control+I)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/italic.svg" alt="Italic Icon" width={15} height={15} />
              </div>
            </button>


            {/* Strike button  */}
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}>
              <div title='Strike (Control+Shift+S)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/strike.svg" alt="strike Icon" width={25} height={25} />
              </div>
            </button>


            {/* heilight  */}
            <input
              className='w-6'
              title='Color'
              type="color"
              onInput={event => editor.commands.toggleHighlight({ color: event.target.value }).run()}
              value={editor.getAttributes('textStyle').color}
              data-testid="setColor"
            />

            {/* Redo button  */}
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
              <div title='Redo' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                <img src="/redo.svg" alt="redo Icon"
                  width={25} height={25}
                />
              </div>
            </button>

            <Sheet>
              <SheetTrigger>
                <div title='Edit' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                  <img src="/pen.svg" alt="pen Icon"
                    width={25} height={25}
                  />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className='my-1'>Tools</SheetTitle>
                  <div className="h-1 w-[50%] bg-black dark:bg-white m-auto rounded-ful"></div>
                  <SheetDescription>
                    <div className="upper-menue mt-6">
                      <div className='flex items-center justify-between m-3'>
                        {/* image button  */}
                        <div className='flex flex-col items-center w-10'>
                          <button className='flex flex-col items-center' onClick={addImage}>
                            <div title='Image' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                              <img src="/img.svg" alt="image Icon" width={25} height={25} />
                            </div>
                          </button>
                          <p>Image</p>
                        </div>
                        {/* Code button  */}
                        <div className='flex flex-col items-center w-10'>
                          <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            className={editor.isActive('code') ? 'is-active' : ''}>
                            <div title='Code (Control+E)' className='h-7 w-7 flex hover:bg-gray-200 items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                              <img src="/code.svg" alt="code Icon" width={25} height={15} />
                            </div>
                          </button>
                          <p>Code</p>
                        </div>
                        {/* text color  */}
                        <div className='flex flex-col items-center w-10'>
                          <div>
                            <input
                              className='w-6'
                              title='Color'
                              type="color"
                              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                              value={editor.getAttributes('textStyle').color}
                              data-testid="setColor"
                            />
                          </div>
                          <p>Color</p>
                        </div>

                      </div>

                      <div className=' flex items-center justify-between m-3'>
                        {/* Subscript button  */}
                        <div className='flex flex-col items-center w-10'>
                          <button
                            onClick={() => editor.chain().focus().toggleSubscript().run()}
                            className={editor.isActive('subscript') ? 'is-active' : ''}>
                            <div title='Subscript (Control+,)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                              <img src="/subscript.svg" alt="subscript Icon" width={25} height={25} />
                            </div>
                          </button>
                          <p>Subscript</p>
                        </div>
                        {/* Superescript button  */}
                        <div className="flex flex-col items-center w-10">
                          <button
                            onClick={() => editor.chain().focus().toggleSuperscript().run()}
                            className={editor.isActive('superscript') ? 'is-active' : ''}>
                            <div title='Superscript (Control+.)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                              <img src="/superscript.svg" alt="superscript Icon" width={25} height={25} />
                            </div>
                          </button>
                          <p>Superscript</p>
                        </div>
                        {/* br  */}
                        <div className="flex flex-col items-center w-10">
                          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                            <div title='Hard Break' className='h-7 w-7 text-xs hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full dark:text-black'>
                              &lt;br&gt;
                            </div>
                          </button>
                          <p>br</p>
                        </div>
                      </div>

                      <div className=' flex items-center justify-centerr gap-11 m-3'>
                        {/* hr  */}
                        <div className="flex flex-col items-center w-10">
                          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                            <div title='Horizantl Rooler' className='h-7 w-7 text-xs hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full dark:text-black'>
                              &lt;hr&gt;
                            </div>
                          </button>
                          <p>hr</p>
                        </div>
                        {/* underline  */}
                        <div className="flex flex-col items-center w-10">
                          <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive('underline') ? 'is-active' : ''}
                          >
                            <div title='Superscript (Control+.)' className='h-7 w-7 hover:bg-gray-200 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                              <img src="/underline.svg" alt="superscript Icon" width={25} height={25} />
                            </div>
                          </button>
                          <p>Underline</p>
                        </div>
                      </div>
                    </div>

                    <div className="lower-menue mt-6">
                      <div className=' flex my-3 justify-between'>
                        {/* font */}
                        <NavigationMenu className='z-10 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='Font' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/font.svg" alt="font Icon"
                                      width={25} height={25}
                                    />
                                  </div>
                                  <p>Font</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className="min-w-[180px] p-5">
                                <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center z-[100]">
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                                    className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}
                                    data-test-id="inter"
                                  >
                                    Inter
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
                                    className={
                                      editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })
                                        ? 'is-active'
                                        : ''
                                    }
                                    data-test-id="comic-sans"
                                  >
                                    Comic Sans
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('serif').run()}
                                    className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}
                                    data-test-id="serif"
                                  >
                                    Serif
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
                                    className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}
                                    data-test-id="monospace"
                                  >
                                    Monospace
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
                                    className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}
                                    data-test-id="cursive"
                                  >
                                    Cursive
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()}
                                    className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''}
                                    data-test-id="css-variable"
                                  >
                                    CSS variable
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()}
                                    className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''}
                                    data-test-id="comic-sans-quoted"
                                  >
                                    Comic Sans quoted
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setFontFamily('"Exo 2"').run()}
                                    className={editor.isActive('textStyle', { fontFamily: '"Exo 2"' }) ? 'is-active' : ''}
                                    data-test-id="exo2"
                                  >
                                    Exo 2
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().unsetFontFamily().run()}
                                    data-test-id="unsetFontFamily">
                                    Unset font family
                                  </button>
                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>

                        {/* table */}
                        <NavigationMenu className='z-10 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='Table' className='h-7 w-7 flex hover:bg-gray-200 items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/table.svg" alt="table Icon" width={25} height={25} />
                                  </div>
                                  <p>Table</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className="min-w-[200px] p-5 h-[250px] overflow-y-scroll">
                                <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                                  <button
                                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                                    }
                                  >
                                    Insert table
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
                                    Add column before
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                                    Toggle header column
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                                    Toggle header row
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                                    Toggle header cell
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                                    Set cell attribute
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                                    Go to previous cell
                                  </button>
                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>

                        {/* heading */}
                        <NavigationMenu className='z-10 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='Heading' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/heading.svg" alt="heading Icon" width={25} height={25} />
                                  </div>
                                  <p>Heading</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <NavigationMenuLink className="mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center">
                                  <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                                  >
                                    H1<div className='text-slate-500'>Control+Alt+1</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                                  >
                                    H2<div className='text-slate-500'>Control+Alt+2</div>
                                  </button>

                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                                  >
                                    H3<div className='text-slate-500'>Control+Alt+3</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-2 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                                  >
                                    H4<div className='text-slate-500'>Control+Alt+4</div>
                                  </button>
                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      </div>

                      <div className=' flex my-3 justify-between'>
                        {/* link  */}
                        <NavigationMenu className='z-0 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='link' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/link.svg" alt="link Icon" width={25} height={25} />
                                  </div>
                                  <p>Link</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className='p-2'>
                                <NavigationMenuLink className="text-[#ffa8a8]r flex items-center justify-center">
                                  <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                                    Add
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().unsetLink().run()}
                                    disabled={!editor.isActive('link')}
                                  >
                                    Remove
                                  </button>
                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>

                        {/* align */}
                        <NavigationMenu className='z-0 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='Align' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/align.svg" alt="align Icon" width={25} height={25} />
                                  </div>
                                  <p>Align</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className="min-w-[120px] p-5">
                                <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                                  <button
                                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                                  >
                                    Left<div className='text-slate-500'>Ctrl+Shift+L</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                                  >
                                    Center<div className='text-slate-500'>Ctrl+Shift+E</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                                  >
                                    Right<div className='text-slate-500'>Ctrl+Shift+R</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                                  >
                                    Justify<div className='text-slate-500'>Ctrl+Shift+J</div>
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>
                                    Unset
                                  </button>
                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>

                        {/* list */}
                        <NavigationMenu className='z-0 w-10'>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <div className='flex flex-col items-center'>
                                  <div title='List' className='h-7 w-7 flex items-center justify-center p-2 border-2 border-black dark:invert rounded-full '>
                                    <img src="/list.svg" alt="list Icon" width={25} height={25} />
                                  </div>
                                  <p>List</p>
                                </div>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className="min-w-[120px] p-3">
                                <NavigationMenuLink className="mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center">
                                  <button
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                                  >
                                    Bullet list
                                  </button>
                                </NavigationMenuLink>
                                <NavigationMenuLink className='mt-1 px-0 text-[#ffa8a8]r flex items-center justify-center'>
                                  <button
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                                  >
                                    Ordered list
                                  </button>

                                </NavigationMenuLink>

                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      </div>
                    </div>

                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>


          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1 my-2'>
          <div className="flex flex-col gap-2 mt-4 mb-3">
            <input
              className='border-2 w-full border-black p-2 rounded-md dark:border-white'
              type="text"
              name="title"
              placeholder='Title of the blog'
              {...register('title', { required: { value: true, message: "Title Required!" } })}
            />
            {errors.title && (
              <span className="text-[#fb8500] text-sm">
                {errors.title.message}
              </span>
            )}

            <input
              className='border-2 w-full border-black p-2 rounded-md dark:border-white'
              type="text"
              name="description"
              placeholder='Description'
              {...register('description', { required: { value: true, message: "Description Required!" } })}
            />
            {errors.description && (
              <span className="text-[#fb8500] text-sm">
                {errors.description.message}
              </span>
            )}

            <input
              className='border-2 w-full border-black p-2 rounded-md dark:border-white'
              type="text"
              name="author"
              placeholder='Author'
              {...register('author', { required: { value: true, message: "Author Required!" } })}
            />
            {errors.author && (
              <span className="text-[#fb8500] text-sm">
                {errors.author.message}
              </span>
            )}

            <input
              className='border-2 w-[100%] border-black p-2 rounded-md dark:border-white'
              type="text"
              name="image"
              placeholder='Image'
              {...register('image', { required: { value: true, message: "Author Required!" } })}
            />
            {errors.image && (
              <span className="text-[#fb8500] text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className='prose prose-lg w-full'>
            {/* this div is to remove tailwind css from input beccuse it remove default behabior of h1 */}
            <EditorContent className='md:w-[187%]' editor={editor} />
          </div>

          <div className='my-4 flex justify-end w-full'>
            <input className="mx-8 mb-6 border border-black dark:border-white rounded-sm px-1 cursor-pointer hover:bg-teal-600 hover:text-white" type="submit" name="submit" />
          </div>
        </form>
      </div>

      {/* <div>{html}</div> */}

    </>
  )
}






