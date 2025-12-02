import { useEffect } from "react";
import { checkSchema, setDatabase } from "../../db2/schema/check/schema.check"

const Footer = () => {
     const checkDatabase = async () => {
          await setDatabase();
          await checkSchema();
     }
     useEffect(() => {
          checkDatabase();
     }, [])

     return (<></>)
}
export default Footer;