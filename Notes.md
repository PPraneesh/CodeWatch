## login and register 
{
    "name"
    "email" //unique
    "password" 
    "userType" == studetn or teacher 
}

db

/lo
/register




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
            testId
        }
    ]
}