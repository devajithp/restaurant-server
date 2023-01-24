const LIVE=false;
const dev= require("./dev")
const prod= require("./prod")

if(LIVE)
{
    module.exports=prod;

}
else
{
    module.exports=dev; 
}