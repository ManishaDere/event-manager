import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Header from './components/Header';
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import DatePicker from "react-datepicker";


import 'bootstrap/dist/css/bootstrap.css';
import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment)

class App extends Component {
  documentData;
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: "",
          end: "",
          title: "",
          description: ""
        }
      ],
      show: false,
      startDate: new Date(),
      endDate: new Date()
    };
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('document'));
    console.log("this.documentData ==>", this.documentData);
    if (localStorage.getItem('document')) {
        this.setState({
        start: this.documentData.start,
        end: this.documentData.end,
        title: this.documentData.title,
        description: this.documentData.description
      })
    } else {
        this.setState({
          start: new Date(),
          end: new Date(),
          title: '',
          description: ''
        })
    }
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }
  handleShow = () => {
    this.setState({
      show: true
    });
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log("event", event);
    console.log("start", start);
    console.log("end", end);
    console.log("allDay", allDay);
  };

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let { startDate, endDate, description, events, show } = this.state;
    let newEvent = {
      start: startDate,
      end: endDate,
      title: this.refs.eventName.value,
      description: description,
      show: show
    }
    this.setState({
      events: [...this.state.events, newEvent]
    }, () =>  {
      localStorage.setItem('document', JSON.stringify(events));
    })
  }

  render() {
    let { show, startDate, endDate } = this.state;
    return (
      <div className="App">
        <Header />
        <Container>
          <h2>Events creater</h2>
          <div className="App__add-events">
            <Button variant="primary" onClick={this.handleShow}>
              Add Event
            </Button>
          </div>

          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            style={{ height: "80vh" }}
          />

          <Modal id="add-events" show={show} onHide={this.handleClose}>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group add-events__event-title">
                <input type="text" name="eventName" className="form-control" ref="eventName" placeholder="Event title"/>
              </div>
              <label htmlFor="startDate">
                Start Date:
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={this.handleChangeStartDate}
              />
              </label>
              <label htmlFor="endDate">
                End Date:
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={this.handleChangeEndDate}
              />
              </label>
              <div className="add-events__event-desc">
                <textarea id="eventDesc" name="eventDesc" rows="5" cols="33" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>
              </div>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
              <button type="submit" className="btn btn-primary btn-block">Save</button>
            </form>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default App;
