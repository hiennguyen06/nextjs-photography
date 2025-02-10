import Image from "next/image";
import profilePicture from "/public/hn-profile.webp";

const Header = () => {
  return (
    <header>
      <figure className="flex flex-col items-center gap-4 py-8">
        <Image
          src={profilePicture}
          alt="Hien's logo"
          width={100}
          height={100}
          priority
          className="rounded-full border-2"
        />
        <figcaption className="flex flex-col items-center">
          <p className="text-balance text-center">
            Captured on film and digital
          </p>
          <p className="text-balance text-center">by Hien Nguyen</p>
        </figcaption>
      </figure>
    </header>
  );
};

export default Header;
