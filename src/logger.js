import { Node as Logtail } from "@logtail/js";

/* Create browser-compatible logger that will transport logs to Better Stack 
*  for centralized storage/tracking. Utilize token, which is the Better Stack 
*  source ID for this specific project 
*/
const token = import.meta.env.VITE_REACT_APP_BETTERSTACK_SOURCE_TOKEN;
const logtail = new Logtail(token);

export default logtail;
