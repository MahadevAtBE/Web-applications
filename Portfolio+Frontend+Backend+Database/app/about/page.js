import React from 'react'

const About = () => {
  return (
    <div>
      <div className="container mx-auto">

        {/* about me  */}
        <div className="me">
          <div className="me my-6 flex gap-16">
            <div className="text">
              <h2 className='text-3xl inline-block hover:text-yellow-500 underline'>Read about me...</h2>
              <p className='text-slate-400 my-2'>Hi I am a fullstack Web-Developer with Three years of exprience in <span className='text-yellow-500'>MERN stack</span>, Database like <span className="text-yellow-500">MongoDb</span>, and librarys like <span className='text-yellow-500'>TailwindCss.</span></p>
              <p className='text-xl mt-4 mx-5'>I have practice on many projects like:-</p>
              <div className="projectx flex items-center justify-around italic text-slate-400 cursor-default">
                <ol className='list-disc'>

                  <li className='hover:text-yellow-400'>Portfolio Website</li>
                  <li className='hover:text-yellow-400'>Business Website</li>
                  <li className='hover:text-yellow-400'>School/College Website</li>
                  <li className='hover:text-yellow-400'>Static/Dymanic sits</li>
                </ol>

                <ol className='list-disc'>
                  <li className='hover:text-yellow-400'>Database handling</li>
                  <li className='hover:text-yellow-400'>Cloud control</li>
                  <li className='hover:text-yellow-400'>Multi-Scelimg website</li>
                  <li className='hover:text-yellow-400'>Domain setup</li>
                </ol>
              </div>
            </div>
            <div className="img">
              <img src="/user-secret.svg" alt="" width="250" height="250" />
            </div>
          </div>
        </div>

        {/* about this site  */}
        <div className="site">

          <div className="me mt-20 flex gap-16">

            <div className="img my-6">
              <img src="/code.svg" alt="" width="250" height="250" />
            </div>

            <div className="text  text-right">
              <h2 className='text-3xl inline-block hover:text-yellow-500 underline'>...read about this site</h2>
              <p className='text-slate-400 my-2'>This ia a practice project of my Fullstack web development which is made with the combination of <span className='text-yellow-500'>Frontend</span>, <span className="text-yellow-500">Backend</span>, <span className='text-yellow-500'>Database.</span></p>
              <p className='text-xl mt-4 mx-5'>-:The skills I have utilized in creating this website are</p>
              <div className="projectx text-left flex items-center justify-around italic text-slate-400 cursor-default">
                <ol className='list-disc'>

                  <li className='hover:text-yellow-400'>Node.js</li>
                  <li className='hover:text-yellow-400'>React</li>
                  <li className='hover:text-yellow-400'>MongoDB</li>
                  <li className='hover:text-yellow-400'>Express.js</li>
                </ol>

                <ol className='list-disc'>
                  <li className='hover:text-yellow-400'>Fontawesome</li>
                  <li className='hover:text-yellow-400'>Cloud control</li>
                  <li className='hover:text-yellow-400'>Multi-Scelimg website</li>
                  <li className='hover:text-yellow-400'>Domain setup</li>
                </ol>
              </div>
            </div>
          </div>
        </div>


        {/* contect me  */}
        <div className="contect-me mt-40">
          <div className="me my-6 flex gap-16 items-center justify-around">
            <div className="text">
              <h2 className='text-3xl inline-block hover:text-yellow-500 underline'>Contect me...</h2>
              <p className='text-slate-400 my-2'>Rech me for official works like to <span className='text-yellow-500'>Make a WebSite</span>, <span className="text-yellow-500">Manage Site</span>, <span className='text-yellow-500'>Fullstack Management.</span></p>
              <p className='text-xl mt-4 mx-5'>Contect me vaya:-</p>

              <div className="ml-28 flex items-center justify-between">
 
                <div className="left">
                  {/* email  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/gmail.svg" alt="gmail" width="40" height="40" />
                    <a
                      target='new'
                      href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDXXtWTjmqVfnkVSchhMxPlHSKCMQhFKFlkjPrpzFKRMlVdczSBLlpCQVjXbWdKjnzPMMph" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Email</h3>
                        <p>sasisekhardas87@gmail.com</p>
                      </div>
                    </a>
                  </div>

                  {/* facebook  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/facebook.svg" alt="facebook" width="40" height="40" />
                    <a
                      target='new'
                      href="https://facebook.com" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Facebook</h3>
                        <p>facebook/sekhar das</p>
                      </div>
                    </a>
                  </div>

                  {/* twitter  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/twitter.svg" alt="twitter" width="40" height="40" />
                    <a
                      target='new'
                      href="https://twitter.com" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Twitter</h3>
                        <p>twitter/sekhar das</p>
                      </div>
                    </a>
                  </div>

                </div>

                <div className="right">
                  {/* linkedin  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/linkedin.svg" alt="linkedin" width="40" height="40" />
                    <a
                      target='new'
                      href="https://linkedin.com" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Linkedin</h3>
                        <p>linkedin/sekhar das</p>
                      </div>
                    </a>
                  </div>

                  {/* github  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/github.svg" alt="github" width="40" height="40" />
                    <a
                      target='new'
                      href="https://github.com/MahadevAtBE/Web-projects" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Github</h3>
                        <p>github/sekhar das</p>
                      </div>
                    </a>
                  </div>

                  {/* youtube  */}
                  <div className="flex items-center gap-3 my-1">
                    <img src="/youtube.svg" alt="youtube" width="40" height="40" />
                    <a
                      target='new'
                      href="www.youtube/sekharCode" className="text-[#8ecae6] hover:text-[#ffb703] transition">
                      <div className="flex flex-col">
                        <h3 className='font-bold text-xl'>Youtube</h3>
                        <p>youtube/sekhar das</p>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

            </div>
            <div className="img my-6 flex flex-col gap-5 items-center justify-center">
              <img src="/call.svg" alt="" width="200" height="200" />
              <div className="hover:text-[#ffb703] transition cursor-">Ph- 9064743234</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
