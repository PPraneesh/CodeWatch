login and register 
{
    "name"
    "email" //unique
    "password" 
    "userType" == studetn or teacher 
}

db

/login
/register


zvslz

teacher 
{
    name
    email
    hashedpass
    testsCreated
}

students
{   
    name
    email
    hashedpass
    testsInfo : [
        {
            testId,
            marks:
            status: copied notcopied
        }... 
    ]
} ...


teacher
results {
    testId: 
    status
    result
    [
        {
            studentId
            studentMarks
        } ...
    ] 
     
} ...




///CODING EDITIR

test.tsx and codingInterface.tsx

test.tsx  -  qId

