import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../components/my-text-input.component";
import { useStore } from "../stores";
import * as Yup from "yup";
import { RegisterUser } from "../interfaces";
import { toast } from "react-toastify";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        interests: "",
        city: "",
      }}
      onSubmit={(values) =>
        userStore
          .register(values as RegisterUser)
          .catch(() => toast.error("Что-то пошло не так"))
      }
      validationSchema={Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        gender: Yup.string().required(),
        age: Yup.number().required().positive().integer(),
        city: Yup.string().required(),
        interests: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Регистрация"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="firstName" placeholder="Имя" />
          <MyTextInput name="lastName" placeholder="Фамилия" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Пароль" type="password" />
          <MyTextInput name="gender" placeholder="Пол" />
          <MyTextInput name="age" placeholder="Возраст" type="number" />
          <MyTextInput name="interests" placeholder="Интересы" />
          <MyTextInput name="city" placeholder="Город" />
          {/* <ErrorMessage 
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    /> */}
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Зарегистрироваться"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
