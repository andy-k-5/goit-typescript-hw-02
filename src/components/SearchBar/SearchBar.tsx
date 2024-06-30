import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FC } from "react";

interface PropsSearchBar {
  onSubmit: (values: string) => void;
}

const SearchBar: FC<PropsSearchBar> = ({ onSubmit }) => {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query === "") {
            toast.error("The search field is empty.");
            return;
          }
          onSubmit(values.query);
          actions.resetForm;
        }}
      >
        <Form
          className={css.form}
         
        >
          <Field
            className={css.input}
            type="text"
            name="query"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
};

export default SearchBar;