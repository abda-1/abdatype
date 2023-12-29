import words from '../dictionary/words.json';
import cpp from '../dictionary/cppwords.json';
import javascript from '../dictionary/javawords.json';
import python from '../dictionary/pythonwords.json';

const getWordList = (wordListType) => {
        
    switch (wordListType) {
        case 'words':
            return words;
        case 'cpp':
            return cpp;
        case 'javascript':
            return javascript;
        case 'python':
            return python;
        
        default:
            return words;
    };
};

export default getWordList;