import UserAcc_page from "../pages/user_acc_page/useracc_page"

export default function RouterUserApp(){
    const Userurl = [{
        url: "/user",
        Pages: <UserAcc_page />
    }, {
        url: "/org_loginpage",
        Pages: <Org_loginpage />
    },
    {
        url: "/",
        Pages: <Main_page />
    },
    {

    }
    ]
    return(
        <Routes>
            {
                Userurl.map((element)=>{
                    return(
                        <Route path={element.url} element={element.Pages}/>
                    )
                })
            }
        </Routes>
    )
}