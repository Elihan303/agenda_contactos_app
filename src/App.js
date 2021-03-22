import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MaskedInput from 'react-text-mask'
import validar_email from'./validation'
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Naruto", apellido: "Uzumaki", telefono: "8096549315", correo: "nuevecolas@kiuby.com" },
  { id: 2, nombre: "Sakura", apellido: "Konoha", telefono: "8097354565", correo: "nuevecolas@kiuby.com" },
  { id: 3, nombre: "Neji", apellido: "Hyuga", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },
  { id: 4, nombre: "Rock", apellido: "Lee", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },
  { id: 5, nombre: "Sarutobi", apellido: "Hayamato", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },
  { id: 6, nombre: "Itachi", apellido: "Uchiha", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },
  { id: 7, nombre: "Kakashi", apellido: "Hatake", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },
  { id: 8, nombre: "Gai", apellido: "Sensei", telefono: "8093249243", correo: "nuevecolas@kiuby.com" },

];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      apellido: "",
      telefono: "",
      correo: ""
    },
    busqueda: '',
    contactos: []
  };

  //Buscar
  BuscarOnChange = async (e) => {
    e.persist();
    await this.setState({
      busqueda: e.target.value
    })
    this.filtrarContactos();
  }


  filtrarContactos = () => {
    let search = data.filter((e) => {
      if (e.nombre.includes(this.state.busqueda) ||
        e.apellido.includes(this.state.busqueda)
      ) { return e }
    })
    this.setState({
      contactos: search
    })
  }

  componentDidMount() {
    this.setState({ contactos: data })
  }

  //Buscar

  //modales
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };
  //  modales

  //funciones 
  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].apellido = dato.apellido;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].correo = dato.correo;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  //funciones 
  render() {

    return (
      <>


        <header className="heade" id="header">
          <nav className="navbar navbar-expand-lg navbar-light  justify-content-between container ">
            <h2>
              <a className="logo">AgendaMax </a>
            </h2>

            <div className="header__nav">

              <nav>
                <a className="header_nav_a" href="https://www.youtube.com/channel/UCj31CP1tmMZkf6jVgdfhIgQ">Youtube</a>
                <a className="header_nav_a" href="https://twitter.com/Jcod37954758">Twitter</a>
                <a className="header_nav_a" href="https://www.instagram.com/junior.eddn17/">Instagram</a>
                <a className="header_nav_a" href="https://github.com/Elihan303/agenda_contactos_app">Github</a>
              </nav>

            </div>


            <div className="form-inline my-2 my-lg-0 flex-column" >
              <form >
                <input className="form-control mr-sm-2 inpunt_buscar "
                  type="search" id='buscarCliente'
                  placeholder="Buscar"
                  aria-label="Search"
                  onChange={this.BuscarOnChange}

                >

                </input>

              </form>
            </div>
          </nav>
        </header>

        <Container>
          <div className='containerr'>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Configuracion</th>
              </tr>
            </thead>

            <tbody>
              {this.state.contactos.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.correo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>



          
        </Container>

        {/* footer */}
        <div className="footer ">
          <p className="footer_p">Copyright © 2010-2021
          TeamPicapollo
            Software</p>
        </div>
        {/* footer */}

        <Modal isOpen={this.state.modalActualizar} className='modal_bg' >
          {/* Modal Editar contacto */}
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono:
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Corrreo:
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>


          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal Editar contacto */}

        {/* Modal insertar contacto */}
        <Modal isOpen={this.state.modalInsertar} className='modal_bg'>
          <ModalHeader>
            <div><h3>Insertar Contacto</h3></div>
          </ModalHeader>

          <ModalBody>
           
            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Telefono:
              </label>
              {/* <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
              /> */}
              <MaskedInput
                type="text"
                className="form-control"
                id='email'
                name="telefono"
                onChange={this.handleChange}
                mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                guide={true} showMask={true}
                value={this.state.form.telefono}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Correo:
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>


          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal insertar contacto */}

        

      </>
      
    );
  }
}
export default App;
