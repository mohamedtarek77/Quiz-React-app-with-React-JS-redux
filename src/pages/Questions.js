// import { Button, CircularProgress, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { decode } from "html-entities";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import useAxios from "../hooks/useAxios";
// import { handleScoreChange } from "../redux/actions";

// const getRandomInt = (max) => {
//   return Math.floor(Math.random() * Math.floor(max));
// };
// const Questions = () => {
//   const {
//     question_category,
//     question_difficulty,
//     question_type,
//     amount_of_question,
//     score,
//   } = useSelector((state) => state);
//   const Navigate = useNavigate();
//   const dispatch = useDispatch();
//   // console.log(amount_of_question,question_category,question_difficulty,question_type)
//   let apiUrl = `/api.php?amount=${amount_of_question}`;
//   if (question_category) {
//     apiUrl = apiUrl.concat(`&category=${question_category}`);
//   }
//   if (question_difficulty) {
//     apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
//   }
//   if (question_type) {
//     apiUrl = apiUrl.concat(`&type=${question_type}`);
//   }
//   const { response, loading } = useAxios({ url: apiUrl });
//   const [questionIndex, setquestionIndex] = useState(0);
//   const [options, setoptions] = useState([]);
//   //  const [Select, setSelect] = useState();
//   // console.log(options);

//   useEffect(() => {
//     if (response?.results.length) {
//       const question = response.results[questionIndex];
//       let answers = [...question.incorrect_answers];
//       answers.splice(
//         getRandomInt(question.incorrect_answers.length),
//         0,
//         question.correct_answer
//       );

//       setoptions(answers);
//       console.log(answers)
//     }
//   }, [response, questionIndex]);
//   // console.log(response);

//   if (loading)
//     return (
//       <Box mt={20}>
//         <CircularProgress />
//       </Box>
//     );

//   const handleClickAnswer = (e) => {

//     const question = response.results[questionIndex];

//     if (e.target.textContent===question.correct_answer){
//       dispatch(handleScoreChange(score+1)) }

//     if (questionIndex + 1 < response.results.length) {
//       setquestionIndex(questionIndex + 1);
//     } else  {
//       Navigate('/score')
//     }

//   };

//   // const handleSelect= (i) =>{

//   //   const question = response.results[questionIndex];

//   // }

//    const quitQuiz = ()=>{

//     Navigate('/score')
//    }

//   return (
//     <Box>
//       <Typography variant="h4"> Questions {questionIndex + 1} </Typography>
//       <Typography mt={5}>

//         { decode( response.results[questionIndex].question)}
//       </Typography>

//      <div className="container">
//      {options.map((option) => (
//         <Box mt={2} key={option.id}>
//           <Button   onClick={handleClickAnswer} variant="contained">

//             {decode(option)}
//           </Button>
//         </Box>
//       ))}

//      </div>

//       <Box  className= "score" mt={5}>
//         Score:{score}/ {response.results.length}
//       </Box>

//        <Button onClick={quitQuiz} > Quit </Button>
//     </Box>
//   );
// };

// export default Questions;

import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import ErrorMessage from "../comp/ErrorMessage";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(amount_of_question,question_category,question_difficulty,question_type)
  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }
  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setquestionIndex] = useState(0);
  const [options, setoptions] = useState([]);
  const [Select, setSelect] = useState();
  const [error, seterror] = useState(false);

  // console.log(Select);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );

      setoptions(answers);
      // console.log(answers);
    }
  }, [response, questionIndex]);
  // console.log(response);

  if (loading)
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );

  const handleSelect = (i) => {
    const question = response.results[questionIndex];

    if (Select === i && Select !== question.correct_answer) {
      return "wrong";
    } else if (i === question.correct_answer) {
      return "select";
    }
  };

  const handleClickAnswer = (i) => {
    const question = response.results[questionIndex];
    setSelect(i);

    if (i === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    seterror(false);
  };

  const quitQuiz = () => {
    Navigate("/score");
  };

  const NextQuestion = () => {
    if (Select) {
      setquestionIndex(questionIndex + 1);
      setSelect();
    } else seterror("Please select an option first");
  };

  const showyourAnswer = () => {
    if (!Select) {
      seterror("Please select an option first");
    } else Navigate("/score");
  };

  return (
    <Box>
      <Typography variant="h4"> Questions {questionIndex + 1} </Typography>
      <Typography mt={5}>
        {decode(response.results[questionIndex].question)}
      </Typography>

      {error && <ErrorMessage> Please Select an answer </ErrorMessage>}

      <div className="container">
        {options &&
          options.map((option) => (
            <Box mt={2} key={option.id}>
              <button
                // style={{backgroundColor: color}}
                className={`singleOption ${Select && handleSelect(option)}`}
                onClick={() => handleClickAnswer(option)}
                // variant="contained"
                disabled={Select}
              >
                {decode(option)}
              </button>
            </Box>
          ))}
      </div>

      <Box className="score" mt={5}>
        Score:{score}/ {response.results.length}
      </Box>
      <div className="blow-btns">
        <Button variant="contained" onClick={quitQuiz}>
          {" "}
          Quit{" "}
        </Button>

        {(questionIndex + 1 < response.results.length  ) ? (
          <Button variant="contained" onClick={NextQuestion}>
            Next Question
          </Button>
        ) :  <Button variant="contained" onClick={showyourAnswer}>
            {" "}
            show your score{" "}
          </Button>}

        
      </div>
    </Box>
  );
};

export default Questions;
