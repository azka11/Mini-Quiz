import AdminSideBar from "../components/Admin_SideBar"
import { getAllCategory } from "../modules/fetch/category"

function AdminQuizCategory() {
    const [data, setData] = useState([])

    const fetchData = () => {
        getAllCategory()
        .then((result) => {
            setData([...result.category])
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div>
                <AdminSideBar />
            </div>

    <section className="p-10 bg-white">
        <div className="container mx-auto px-8 ml-24" >
        <h2 className="text-3xl font-light text-black sm:text-4xl lg:text-5xl">
            it's <span className="block w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 lg:inline">My Catgory for Quiz
            </span>.
        </h2>
        <p className="mb-5 text-lg text-gray-900">Catgory for Quiz.</p>
        <div className="flex justify-center">
        <div className="grid w-3/4 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-8">
        {data.map((category) => (
            <button className="relative shadow-2xl" key={category.category_id}>
                <Link
                key={category.category_id}
                to={`/admin/quiz/${category.category_id}`}
                state={{ fromHome: { category } }}
                >
                <div className="h-full relative shadow-2xl shadow-green-900 overflow-hidden group" >
                    <div className="absolute -bottom-2 group-hover:top-0 left-0 w-full h-full group-hover:bg-yellow-500 transition-all ease-in-out duration-500 ">
                        <div className="w-full h-full flex justify-center px-5 ">
                          <h2 className="text-2xl font-bold text-white mb-0 pb-1">{category.category_name}</h2>
                            <div className="absolute -bottom-2 group-hover:bottom-4 text-white text-left transition-all ease-in-out duration-500 ">
                                <p className="text-sm font-light text-white">soal - soal tentang javascript</p>
                            </div>
                        </div>
                    </div>
                    <img src={`https://www.royaloakhighamspark.co.uk/wp-content/uploads/2022/09/1-1.png`} className="w-full h-full object-fill z-10 " />
                </div>
                </Link>
            </button>
      ))}
      </div>
        </div>
    </div>     
</section>          
        </div>
    )
}