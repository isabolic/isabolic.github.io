import { useTitle } from "react-use"
const mainTitle = 'Isabolic | Frontend Developer';


export const usePageTitle = (pageTitle?: string) => {
    const title = pageTitle ? `${pageTitle} - ` : "";
    useTitle(`${title}${mainTitle}`)
}