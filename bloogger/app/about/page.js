import React from "react";

const About = () => {
    return (
        <div className="max-w-[80%] mx-auto flex flex-col text-cente justify-center">
            <div className="px-4 py-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    About <span className="text-yellow-500">Me</span>
                </h1>
                <div className="h-1 dark:bg-white bg-black w-[60%] mx-auto rounded-full mb-8"></div> {/*line */}

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center">
                    {/* Profile Image */}
                    <div
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                        title="Profile Image">
                        <img
                            src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="text-center md:text-left max-w-xl">
                        <p className="text-lg md:text-xl leading-relaxed">
                            Hello! I'm a passionate programmer and tech enthusiast who loves
                            building innovative solutions and sharing my journey through
                            blogging. I specialize in modern web technologies like React, Next.js,
                            and Tailwind CSS. My goal is to empower others with knowledge and
                            inspire through creativity.
                        </p>
                        <p className="mt-4 text-lg md:text-xl leading-relaxed">
                            When I'm not coding, you'll find me exploring new tools, contributing
                            to open source, or diving into books about software development and
                            design. Join me on this exciting journey as we navigate the world of
                            programming together!
                        </p>
                    </div>
                </div>
            </div>

            <section className="px-4 py-12 mt-9">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    About <span className="text-yellow-500">Binary Eco</span>
                </h1>
                <div className="h-1 dark:bg-white bg-black w-[60%] mx-auto rounded-full mb-8"></div> {/*line */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 justify-center">
                    {/* Logo Section */}
                    <div
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                        title="Site Logo"
                    >
                        <img
                            src="binary-echo-logo.png"
                            alt="Site Logo"
                            className="w-full h-full object-cover bg-[#1e2d40]"
                        />
                    </div>

                    {/* Description Section */}
                    <div className="text-center md:text-left max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Welcome to My Programming Blog
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed">
                            This blog is your daily dose of programming insights, tutorials, and
                            updates. Here, I explore new and upcoming features in the world of
                            programming, sharing in-depth analyses, tips, and hands-on guides.
                        </p>
                        <p className="mt-4 text-lg md:text-xl leading-relaxed">
                            My mission is to keep you informed and inspired, whether you're a
                            seasoned developer or just starting out. Join me as I dive into the
                            latest trends, tools, and technologies shaping the future of coding!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
