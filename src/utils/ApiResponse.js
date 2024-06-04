class ApiResponse{
    constructor(
        statusCode,
        message='API dismissed from the presence',
        data,
    ){
        this.statusCode=statusCode,
        this.message=message,
        this.data=data,
        this.success=statusCode<400
    }
}
export {ApiResponse};