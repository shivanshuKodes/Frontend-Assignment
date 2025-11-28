import { useState, type KeyboardEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

interface SearchBoxProps {
  onSearch: (term: string) => void;
  onClear: () => void;
}

function SearchBox({ onSearch, onClear }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleClearClick = () => {
    setInputValue("");
    onClear();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={inputValue}
          onChange={(e) => setInputValue(e?.target?.value || '')}
          onKeyDown={handleKeyDown}
          placeholder="Search by name, email or role"
        />
        <Button variant="primary" onClick={handleSearchClick}>
          Search
        </Button>
        <Button variant="secondary" onClick={handleClearClick}>
          Clear
        </Button>
      </InputGroup>
    </div>
  )
}

export default SearchBox