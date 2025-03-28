export default function RouterUserApp(){
    const Userurl = [{
        url: "/createaccpage",
        Pages: <Createaccpage />
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
                pageurl.map((element)=>{
                    return(
                        <Route path={element.url} element={element.Pages}/>
                    )
                })
            }
        </Routes>
    )
}