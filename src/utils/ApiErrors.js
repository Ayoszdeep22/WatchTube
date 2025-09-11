class ApiErrors extends Error{
    constructor(statuscode,message="something went wrong",error=[],stack){
        super(message)
        this.statuscode=statuscode
        this.error=error
        
        this.data=null
        this.success=false

        if(stack){
            this.stack=stack

        }
        else{
            Error.captureStackTrace(this.this.consstructor)
        }

    }
}
export {ApiErrors}