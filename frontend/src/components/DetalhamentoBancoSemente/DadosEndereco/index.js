"use client"

import style from "../detalhamentoBanco.module.scss";

export default function DadosEndereco({ formik, editar }) {

  return (
    <>
      <div className={style.container__header_title}>
        <h1>Endereço do Banco</h1>
      </div>
      {editar === false ? (
        <>
          <div className={style.container__ContainerForm_form_threePartsContainer}>

            <div>
              <label htmlFor="endereco.estado">Estado </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="estado"
                name="endereco.estado"
                placeholder="Não informado"
                value={formik.values.endereco.estado}
                disabled
              />
            </div>
            <div>
              <label htmlFor="endereco.cidade">Cidade </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="cidade"
                name="endereco.cidade"
                placeholder="Não informado"
                value={formik.values.endereco.cidade}
                disabled
              />
            </div>
            <div>
              <label htmlFor="endereco.bairro">Bairro </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="bairro"
                name="endereco.bairro"
                placeholder="Não informado"
                value={formik.values.endereco.bairro}
                disabled
              />
            </div>
            <div>
              <label htmlFor="endereco.logradouro">Rua </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="logradouro"
                name="endereco.logradouro"
                placeholder="Não informado"
                value={formik.values.endereco.logradouro}
                disabled
              />
            </div>

            <div>
              <label htmlFor="endereco.numero">Número </label>
              <input
                className={style.container__ContainerForm_form_input}
                name="endereco.numero"
                placeholder="Não informado"
                value={formik.values.endereco.numero}
                disabled
              />
            </div>
            <div>
              <label htmlFor="endereco.complemento">Complemento </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="complemento"
                name="endereco.referencia"
                placeholder="Não informado"
                value={formik.values.endereco.referencia}
                disabled
              />

            </div>
          </div>

        </>
      ) : (
        <>
          <div className={style.container__ContainerForm_form_threePartsContainer}>

            <div>
              <label htmlFor="endereco.estado">Estado </label>
              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                id="estado"
                name="endereco.estado"
                placeholder="Insira seu Estado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.estado}
                
              />
              {formik.touched.estado && formik.errors.estado ? (
                <span className={style.form__error}>{formik.errors.endereco.estado}</span>
              ) : null}

            </div>
            <div>

              <label htmlFor="endereco.cidade">Cidade </label>
              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                id="cidade"
                name="endereco.cidade"
                placeholder="Insira sua cidade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.cidade}
                
              />
              {formik.touched.cidade && formik.errors.cidade ? (
                <span className={style.form__error}>{formik.errors.endereco.cidade}</span>
              ) : null}

            </div>
            <div>
              <label htmlFor="endereco.bairro">Bairro </label>

              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                id="bairro"
                name="endereco.bairro"
                placeholder="Insira seu bairro"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.bairro}
                
              />
              {formik.touched.bairro && formik.errors.bairro ? (
                <span className={style.form__error}>{formik.errors.endereco.bairro}</span>
              ) : null}

            </div>
            <div>
              <label htmlFor="endereco.logradouro">Rua </label>
              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                id="logradouro"
                name="endereco.logradouro"
                placeholder="Insira o nome da rua"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.logradouro}
                
              />
              {formik.touched.logradouro && formik.errors.endereco.logradouro ? (
                <span className={style.form__error}>{formik.errors.endereco.logradouro}</span>
              ) : null}
            </div>
            <div>
              <label htmlFor="endereco.numero">Número </label>
              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                name="endereco.numero"
                placeholder="Insira o número"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.numero}
                
              />
              {formik.touched.numero && formik.errors.endereco.numero ? (
                <span className={style.form__error}>{formik.errors.endereco.numero}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor="endereco.complemento">Complemento </label>
              <input
                className={style.container__ContainerForm_form_halfContainer_input}
                id="complemento"
                name="endereco.referencia"
                placeholder="Insira um complemento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco.referencia}
              />
              {formik.touched.referencia && formik.errors.endereco.referencia ? (
                <span className={style.form__error}>{formik.errors.endereco.referencia}</span>
              ) : null}
            </div>
          </div>

        </>
      )}
    </>
  )
}