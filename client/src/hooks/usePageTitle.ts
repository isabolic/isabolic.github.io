import { useTitle } from "react-use"
const mainTitle = 'Ivan Sabolic | Frontend Developer';


export const usePageTitle = (pageTitle?: string) => {
    const title = pageTitle ? `${pageTitle} - ` : "";
    useTitle(`${title}${mainTitle}`)
}