import SearchBox from "./components/SearchBox";
import Usertable from "./components/Usertable"
import Container from 'react-bootstrap/Container';
import { useState } from "react";


function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <>
      <Container className="mt-4">
        <SearchBox onSearch={handleSearch} onClear={handleClear} />
        <Usertable searchTerm={searchTerm} />
      </Container>
    </>
  )
}

export default App
