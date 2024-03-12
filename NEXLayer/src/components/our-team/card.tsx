import Image from "next/image";
import Link from "next/link";
import React from "react";


const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <div className=" relative  bg-[#161616] ">
            <div className="rounded overflow-hidden shadow-md bg-black mt-24 ">
                <div className="absolute -mt-20 w-full flex justify-center">
                    <div className=" sm:h-32 sm:w-32">
                        <Image
                            src={member.imageSrc}
                            alt={`DP`}
                            role="img"
                            className="rounded-full object-cover h-full w-full shadow-md"
                            width={128}
                            height={128}
                        />
                    </div>
                </div>
                <div className="px-6 mt-16 text-white rounded">
                    <h1 className="font-bold text-3xl text-center mb-1">{member.name}</h1>
                    <p className=" text-sm text-center">{member.role}</p>
                    <p className="text-center  text-[12px] md:text-[16px] pt-3 font-normal">{member.bio}</p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                        {member.socialLinks.map((link, index) => (
                            <Link href={link.url} className="mx-5" key={index}>
                                <div aria-label={link.platform} role="">
                                  {link.icon}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Team: React.FC<{ members: TeamMember[] }> = ({ members }) => {
    return (
        <div className="relative z-50 w-full bg-gray-100 container mx-auto ]">

            <div role="list" aria-label="Our Team" className="w-full lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around ">
                {members.map((member, index) => (
                    <TeamMemberCard member={member} key={index} />
                ))}
            </div>

        </div>
    );
};
export default Team;