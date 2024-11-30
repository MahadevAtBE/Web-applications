"use client" // use clint to male a clint component

export default function Home() {

  return (
    <div>
      {/* hire me container  */}
      <div className="mx-auto my-10 gap-16 flex items-center justify-center">
        <div className="info w-1/2">
          <h2 className='text-4xl inline-block underline my-2 hover:text-yellow-500'>Sekhar Das</h2>
          <h3 className='text-xl my-1 text-slate-300'>The fullstack Webdeveloper</h3>
          <p className='text-slate-400'>Hi I am a fullstack Web-Developer with Three years of exprience in <span className='text-yellow-500'>MERN stack</span>, Database like <span className="text-yellow-500">MongoDb</span>, and librarys like <span className='text-yellow-500'>TailwindCss</span> </p>
          <a
            target='new'
            href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDXXtWTjmqVfnkVSchhMxPlHSKCMQhFKFlkjPrpzFKRMlVdczSBLlpCQVjXbWdKjnzPMMph">
            <button className='border py-2 px-14 mt-5 rounded-md bg-slate-800 text-white hover:bg-yellow-500'>Hair Me...</button>
          </a>
        </div>
        <div className="img border-2 rounded-xl p-4 hover:shadow-lg hover:shadow-yellow-600">
          <img className='' src="/user.svg" alt="myPhoto" width="250" height="250" />
        </div>
      </div>

      {/* skils  */}
      <div className="w-[60%] mx-auto my-10 gap-7 flex flex-col items-center justify-center">
        <div className="aquireText flex flex-col items-center gap-2">
          <h1 className="text-3xl">Skils I aquare...</h1>
          <div className="line h-1 w-[150%] rounded-full bg-white"></div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-12" src="/c.svg" alt="c" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">C Programming</h3>
                <p className="text-sm text-slate-400">Learnd C as the first programming language for strong fundamentals and file/data system.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[70%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-12 w-12" src="/java.svg" alt="java" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">JAVA</h3>
                <p className="text-sm text-slate-400">Learnd Java to understand Object Oriented Programming.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[60%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-12 w-12" src="/html.svg" alt="html" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">HTML</h3>
                <p className="text-sm text-slate-400">I know html as a web language, Practice symantic tags to batter SEO.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[80%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-12" src="/css.svg" alt="css" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">CSS</h3>
                <p className="text-sm text-slate-400">Learnd CSS and practice it for long time to get a proper hand in flex, animation and color theory.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[70%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-12" src="/js.svg" alt="css" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">Java Script</h3>
                <p className="text-sm text-slate-400">Learnd Java script as a primary programming language, practice its all methods, masterd DOM menupulation.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[85%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-7" src="/tailwindcss.svg" alt="tailwindcss" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">Tailwind CSS</h3>
                <p className="text-sm text-slate-400">Practice Tailwind CSS the css fremwork for fast production and to work with other fremwork as well.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[65%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo">
                <img className="h-9" src="/node.svg" alt="node" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">Node.js</h3>
                <p className="text-sm text-slate-400">Learnd Jaca script as a primary programming language, practice its all methods, masterd DOM menupulation.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[75%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo bg-white rounded-full p-1">
                <img className="h-9" src="/express.svg" alt="express" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">Express.js</h3>
                <p className="text-sm text-slate-400">Learnd Express as to control Backend, api connection, request responce method, connectivity of frontend and database.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[60%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo bg-white rounded-full p-1 flex items-center justify-center">
                <img className="h-9" src="/mongodb.svg" alt="mongodb" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">MongoDB</h3>
                <p className="text-sm text-slate-400">For database learnd MongoDB as a non sql database, its CRUD operation, data searching, saving, deletation.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[55%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo p-1 flex items-center justify-center">
                <img className="h-9" src="/react.svg" alt="react" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">React</h3>
                <p className="text-sm text-slate-400">For Javascript libraby i have learned React for brtter ans faster frontend development.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[70%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <div className="skilsCntainer w-full flex flex-col gap-10">
          <div className="skils flex flex-col gap-2">
            <div className="logo&Info flex gap-2">
              <div className="logo  bg-white rounded-full p-1 flex items-center justify-center">
                <img className="h-9" src="/next.svg" alt="next" />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold">Next.js</h3>
                <p className="text-sm text-slate-400">For frontend and backend both development learned Next.js the React framewark.</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="w-[60%] bg-green-400 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>


      </div>
      <div className="feedback py-3 bg-[#152630]">
        <div className="container bg-pinfk-500 mx-auto flex items-center justify-around">
          <div className="text">
            <h3 className="font-bold text-xl">Send Feedback</h3>
            <p className="text-sm text-slate-400">If you think we have to improve somthing then let us know by sending this feedback.</p>
          </div>
          <div className="feedback flex flex-col items-center justify-center">
            <input className="rounded-md bg-[#152630] border-2 border-white h-12" type="text" name="feedback" id="feedback" placeholder="feedback" />
            <input className='border-2 py- px-4 mt-2 rounded-full bg-slate-800 text-white hover:bg-yellow-500' type="submit" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}
