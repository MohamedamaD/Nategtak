import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logo.svg";
import { Popup, Loading } from "./components";

function App() {
  const baseURL = `https://high-school-grades-app.onrender.com/api/`;
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([{}]);

  const [searchOpt, setSearchOpt] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const __tableStructure = {
    thead: ["#", "name", "id", "total degree", "state"],
  };
  const [popup, setPopup] = useState({
    isActive: false,
    isSuccess: true,
    value: "success",
    paragraph: "all things are working",
  });

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    if (searchValue.length <= 0) {
      setPopup({
        isActive: true,
        isSuccess: false,
        value: "warning",
        paragraph: "empty not required",
      });
      return;
    }
    setLoading(true);

    try {
      const connectionString = `${baseURL}/find/${searchOpt}/${searchValue}`;
      const res = await fetch(connectionString);

      if (res.status === 200) {
        const data = await res.json();
        setStudents(data.data);
        setPopup({
          isActive: true,
          isSuccess: true,
          value: "success",
          paragraph: "great success searching operation...",
        });
      } else if (res.status === 404) {
        setPopup({
          isActive: true,
          isSuccess: false,
          value: "error",
          paragraph: "student not found",
        });
      }
    } catch (e) {
      setPopup({
        isActive: true,
        isSuccess: false,
        value: "error searching",
        paragraph: e.message,
      });
      setStudents([]);
    }

    setLoading(false);
  };
  const moreHandler = () => {
    setLimit((prev) => prev + 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/?limit=${limit}`);
        const data = await res.json().then((data) => data?.data);
        setStudents(data);
      } catch (err) {
        setPopup({
          isActive: true,
          isSuccess: false,
          value: "404",
          paragraph: "server error - " + err.message,
        });
        setStudents([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [baseURL, limit]);

  return (
    <div className="App">
      {popup.isActive && <Popup props={{ popup, setPopup }} />}
      {loading && <Loading />}
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div className="search-bar my-5">
            <img className="img w-100 mb-2" src={logo} alt="logo" />
            <div className="search-box row justify-content-between">
              <div className="col-md-12 mb-3 mb-md-0">
                <input
                  type="search"
                  onChange={(ev) => setSearchValue(ev.target.value)}
                  placeholder={"type your " + searchOpt}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mt-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(ev) => setSearchOpt(ev.target.value)}
                >
                  <option value="name">name</option>
                  <option value="id">id</option>
                </select>
              </div>
              <div className="col-md-6 mt-4">
                <button type="submit" className="btn btn-primary w-100">
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr className="bg-dark">
              {__tableStructure.thead.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.seating_no + index}>
                <th scope="row">{index + 1}</th>
                <td>{student.arabic_name}</td>
                <td>{student.seating_no}</td>
                <td>{Number(student.total_degree).toFixed()}</td>
                <td>{student.student_case_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length > 0 ? (
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => moreHandler()}
          >
            more
          </button>
        ) : (
          <p className="text-center text-danger" style={{ fontWeight: "bold" }}>
            no data to show
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
