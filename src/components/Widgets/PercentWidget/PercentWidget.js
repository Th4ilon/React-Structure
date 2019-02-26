import React from 'react';
import { Card, CardBody, Progress, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const PercentWidget = ({
  text,
  counter,
  icon,
  progressValue,
  progressColor
}) => (
  <Col sm={6} md={3}>
    <Card>
      <CardBody className="min-hght">
        <div className="h1 text-muted text-right mb-4">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="h4 m-0">{counter}</div>
        <div className="text-muted text-uppercase font-weight-bold">{text}</div>
        <Progress
          className="progress progress-xs my-3"
          color={progressColor}
          value={progressValue}
        />
      </CardBody>
    </Card>
  </Col>
);

PercentWidget.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object, // eslint-disable-line
  counter: PropTypes.number,
  progressValue: PropTypes.number,
  progressColor: PropTypes.string
};

PercentWidget.defaultProps = {
  text: '',
  icon: {},
  counter: 0,
  progressValue: 0,
  progressColor: 'green'
};

export default PercentWidget;
