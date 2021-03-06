import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import { Thing } from "../schema/types";
import { UrlPreview } from "./UrlPreview";
import { styles } from "../utils/styles";
import { Separator } from "./Separator";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { getFirebasePath } from "../utils/get-firebase-path";

export const UserAvatar = ({ photo_url, username }) => {
  return (
    <div style={{ display: "flex" }}>
      <Avatar src={photo_url} style={{ width: 20, height: 20 }} />
      <Separator space={5} horizontal />
      <Typography component="h5" color="textSecondary">
        {username}
      </Typography>
    </div>
  );
};

export const ThingPreview = withStyles(styles)(
  ({
    thingId,
    thingData,
    classes,
    onDelete = async thingId => {}
  }: {
    thingId: string;
    thingData: Thing;
    classes: any;
    onDelete?: (thingId: string) => void;
  }) => {
    const {
      created_on,
      name,
      tags,
      types,
      description,
      main_url,
      author_id
    } = thingData;
    const createdOnDate = new Date(created_on as number);
    const date = `${createdOnDate.toLocaleDateString()} ${createdOnDate.toLocaleTimeString()}`;
    return (
      <React.Fragment>
        <Card style={{ width: 500 }} data-testid="thing-preview">
          <CardContent>
            <Typography className={classes.cardTitle} color="textSecondary">
              {date}
            </Typography>
            <Typography variant="headline" component="h2">
              {name}
            </Typography>
            <Separator space={15} vertical />
            <FirebaseDatabaseNode
              path={getFirebasePath(`users_public/${author_id}`)}
            >
              {({ value }) => (
                <React.Fragment>
                  <Separator space={5} vertical />
                  <UserAvatar {...value} />
                  <Separator space={5} vertical />
                </React.Fragment>
              )}
            </FirebaseDatabaseNode>
            <Separator vertical space={10} />
            <React.Fragment>
              {types &&
                Object.keys(types).map(type => (
                  <Chip
                    label={type}
                    key={type}
                    style={{ marginRight: 10 }}
                    color="primary"
                  />
                ))}
            </React.Fragment>
            <Separator vertical space={20} />

            <Typography component="p">{description}</Typography>
            <Separator vertical space={5} />
            <Separator vertical space={20} />
            <UrlPreview url={main_url} />
          </CardContent>
          <CardActions>
            <Button
              variant="fab"
              aria-label="Delete"
              color="secondary"
              data-testid={"delete-thing"}
              onClick={() => {
                onDelete(thingId);
              }}
            >
              <DeleteIcon />
            </Button>
            <Separator vertical space={10} />
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
);
