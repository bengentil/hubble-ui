// Copyright 2019 Authors of Hubble
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import * as React from "react";
import { provide } from "../../state";

const css = require("./LoadingView.scss");

interface OwnProps {
  readonly transparent?: boolean;
}

const provider = provide({
  mapStateToProps: (state, ownProps: OwnProps) => ({
    isDataUnavailableAndLoading: false
  })
});

export const { Container: LoadingView } = provider(Props => {
  type Props = typeof Props;
  return class LoadingViewClass extends React.Component<Props> {
    render() {
      const { isDataUnavailableAndLoading } = this.props;
      if (!isDataUnavailableAndLoading) {
        return null;
      }
      const className = [
        css.wrapper,
        this.props.transparent && css.transparent
      ].join(" ");
      return (
        <div className={className}>
          <img
            src={require("../assets/illustrations/spinner.svg")}
            className={`${css.spinner} spin`}
          />
        </div>
      );
    }
  };
});
