import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CenterContainer } from "../components";

export const ContactRoute = () => {
  return (
    <>
      <CenterContainer className="w-full flex-col items-center">
        <h1 className="lg:text-4xl text-2xl">Contact me</h1>
        <CenterContainer className="w-full items-center">
          <div className="p-5 mr-5 border border-0 rounded-full bg-gray-500">
            <a
              href="mailto:sabolic.ivan@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex justify-center items-center animate__animated hover:text-cyan hover-pulse-2"
            >
              <FontAwesomeIcon fontSize={24} icon={["fas", "envelope"]} />
            </a>
          </div>

          <div className="p-5 border rounded-full border-0 bg-gray-500">
            <a
              href="tel:+385994763121"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10  flex justify-center items-center animate__animated hover:text-cyan hover-pulse-2"
            >
              <FontAwesomeIcon fontSize={24} icon={["fas", "phone"]} />
            </a>
          </div>
        </CenterContainer>
      </CenterContainer>
    </>
  );
};
