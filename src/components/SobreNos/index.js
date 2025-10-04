import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //BOOTSTRAP
import "bootstrap/dist/js/bootstrap.bundle";
import "./style.css"; //CSS

const Sobrenos = () => {
  return (
    <div>
      {/* BANNER */}
      <div className="img-fluid" id="banner">
        {/* BACKGROUND */}
        <img
          src={require('../../assets/sobrenos-images/banner_sobrenos.jpeg')}
          alt="Sobre Nós"
          className="img-fluid banner-img"
        />

        {/* CONTEÚDO DENTRO DO BANNER */}
        <div className="banner-conteudo text-center">
          {/*TÍTULO*/}
          <h1 className="display-1 animate__animated animate__fadeInUp">Sobre Nós</h1>
          {/* SUBTÍTULO */}
          <p className="animate__animated animate__fadeInUp">Um pouco sobre o que somos e o que pretendemos alcançar</p>
        </div>
      </div>
      {/* PARTE DE MISSÃO, VISÃO E VALORES*/}
      <div>
        {/* MVV-SECTION ESTILIZA SEÇÕES, E PY-5 ADICIONA PADDING VERTICAL DE 5 UNIDADES. */}

        <div className="container mt-5" style={{color:"#000"}}>
          <div className="row text-center">
            {/* Divisão COLUNAS */}
            <div className="col-md-4" style={{ padding: 70 }}>
              {/* ICONE */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1628/1628441.png"
                alt="missao"
                className="icones img-fluid"
              />
              <h3 className="display-4">Missão</h3>
              <p>
                Otimizar e modernizar os sistemas de comunicação e informação do
                CAT SESI Santo André, abrangendo desde a gestão interna até a
                comunicação com os usuários. Os focos incluem o desenvolvimento
                de uma assistente virtual de atendimento básico.
              </p>
            </div>
            <div
              className="col-md-4"
              style={{ borderRadius: 20, height: 450, padding: 70 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1063/1063373.png"
                alt="visao"
                className="icones img-fluid"
              />
              <h3 className="display-4">Visão</h3>
              <p>
                Queremos ser uma organização inovadora e líder no nosso setor,
                reconhecida pela excelência em nossos serviços, e pela nossa
                capacidade de adaptar e crescer em um mercado em constante
                evolução.
              </p>
            </div>
            <div className="col-md-4" style={{ padding: 70 }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5002/5002927.png"
                alt="valores"
                className="icones img-fluid"
              />
              <h3 className="display-4">Valores</h3>
              <p>
                Inovação: Soluções tecnológicas criativas e eficazes.
                Eficiência: Processos de atendimento rápidos e precisos.
                Acessibilidade: Atendimento fácil e intuitivo para todos os
                usuários. Integração: Harmonização entre diferentes sistemas e
                canais.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ONDE ESTAMOS */}
      <div className="location-section py-5">
        <div className="container">
          <div className="col d-flex justify-content-center" id="local">
            <div className="col-md-6 col-sm-12">
              <h2 className="display-4 text-start mb-4">Onde Estamos</h2>
              <iframe
                title="Mapa Sesi 166"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14620.31144267011!2d-46.5361938!3d-23.6373825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42bea5555555%3A0x304c99916fe0aa3f!2sSesi%20Santo%20Andr%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1725024245413!5m2!1spt-BR!2sbr"
                width="100%"
                height="459"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="col-md-6 col-sm-12 p-5 flex-column justify-content-center" style={{color:"#000"}}>
              <h3 className="display-4 text-center">Endereço</h3>
              <p className="text-center">
                Praça Dr. Armando Arruda Pereira, 100 - Santa Terezinha, Santo
                André - SP, 09210-550
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sobrenos;
