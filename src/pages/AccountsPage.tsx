import { Alert, Typography } from "../components/layouts";
import { Button, Select, TextField } from "../components/inputs";
import {
  createAccount,
  CreateAccountImplResult,
  getAccount,
  MinecraftAccount,
} from "../struct/accounts";
import { logger, t } from "../renderer/global";
import { ephConfigs, setConfig } from "../renderer/config";
import { RemoveAccountDialog } from "../components/Dialogs";
import { MdCreate, MdDelete } from "react-icons/md";
import { List, ListItem } from "../components/lists";
import { showDialog } from "../components/GlobalOverlay";
import { TabBar, TabBarItem, TabBody, TabController } from "../components/tabs";
import { useState } from "react";
import { DefaultFunction, EmptyObject } from "../tools/types";
import Spin from "../components/Spin";
import { FlexibleComponent } from "../tools/component";

export function CreateAccountFragment(props: { onDone: DefaultFunction }): JSX.Element {
  const [errAlert, setErrAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [msAccNoMcAlert, setMsAccNoMcAlert] = useState(false);
  const [value, setValue] = useState("mojang");
  const [authserver, setAuthserver] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = () => {
    setLoading(true);
    setErrAlert(false);
    setMsAccNoMcAlert(false);
    createAccount(value, name, password, authserver).then((value: CreateAccountImplResult) => {
      setLoading(false);
      if (value.success) {
        props.onDone();
      } else {
        if (value.message === "msAccNoMinecraft") {
          setMsAccNoMcAlert(true);
        } else {
          setErrAlert(true);
        }
      }
    });
  };

  return (
    <>
      <div className="h-12" />
      <div>
        {errAlert && (
          <div className="my-3">
            <Alert severity="warn">{t.errCreatingAccount}</Alert>
          </div>
        )}
        {msAccNoMcAlert && (
          <div className="my-3">
            <Alert severity="warn">{t.msAccNoMinecraft}</Alert>
          </div>
        )}
        <Select value={value} onChange={setValue}>
          <option value={"mojang"}>{t.mojang}</option>
          <option value={"microsoft"}>{t.microsoft}</option>
          <option value={"authlib"}>{t.authlib}</option>
          <option value={"offline"}>{t.offline}</option>
        </Select>
        <div hidden={value !== "mojang"}>
          <TextField label={t.email} value={name} onChange={setName} />
          <TextField label={t.password} value={password} onChange={setPassword} type="password" />
        </div>
        <div hidden={value !== "microsoft"}>
          <Typography>{t.clickToLogin}</Typography>
        </div>
        <div hidden={value !== "authlib"}>
          <TextField label={t.authserver} value={authserver} onChange={setAuthserver} />
          <TextField label={t.email} value={name} onChange={setName} />
          <TextField label={t.password} value={password} onChange={setPassword} type="password" />
        </div>
        <div hidden={value !== "offline"}>
          <TextField label={t.username} value={name} onChange={setName} />
        </div>
      </div>
      <div className="flex">
        <div className="flex-grow">{isLoading && <Spin />}</div>
        <Button className="text-shallow" onClick={props.onDone} textInherit>
          {t.cancel}
        </Button>
        <Button disabled={isLoading} onClick={handleCreate}>
          {t.create}
        </Button>
      </div>
    </>
  );
}

export interface AccountsPageState {
  creating: boolean;
}

export default class AccountsPage extends FlexibleComponent<EmptyObject, AccountsPageState> {
  state = {
    creating: false,
  };
  handleCreate = (): void => this.setState({ creating: true });
  handleRemove = (selected: number): void =>
    showDialog((close) => (
      <RemoveAccountDialog updateAccounts={this.updateUI} onClose={close} id={selected} />
    ));
  render(): JSX.Element {
    const accounts = ephConfigs.accounts;
    const selected = ephConfigs.selectedAccount;
    const current = getAccount(selected);

    /**<div className="flex flex-col eph-h-full justify-center items-center">
        <Typography className="text-shallow" textInherit>
          {t.noAccountsYet}
        </Typography>
        <Button variant="contained" onClick={this.handleCreate}>
          <MdCreate />
          {t.create}
        </Button>
      </div> */

    return (
      <div className="flex eph-h-full">
        <div className="overflow-y-scroll py-3 w-1/4">
          <div className="flex p-3">
            <Button variant="contained" onClick={this.handleCreate}>
              <MdCreate />
              {t.create}
            </Button>
          </div>
          <List className="space-y-3">
            {accounts.map((i: MinecraftAccount) => (
              <ListItem
                className="p-3 mx-2 rounded-lg"
                checked={!this.state.creating && selected === i.id}
                onClick={() => {
                  logger.info(`Account selection changed to id ${i.id}`);
                  setConfig({ selectedAccount: i.id });
                  this.updateUI();
                }}
                key={i.id}
              >
                <Typography className="flex space-x-1">{i.name}</Typography>
              </ListItem>
            ))}
          </List>
        </div>
        {this.state.creating ? (
          <div className="border-l border-divide p-3 w-3/4">
            <CreateAccountFragment onDone={() => this.setState({ creating: false })} />
          </div>
        ) : (
          <TabController className="flex-grow p-3 w-3/4" orientation="horizontal">
            <TabBar>
              <TabBarItem value={0}>{t.general}</TabBarItem>
              <TabBarItem value={1}>{t.edit}</TabBarItem>
            </TabBar>
            <TabBody>
              <div className="flex flex-col">
                <div className="flex-grow">
                  <Typography className="text-shallow" textInherit>
                    ID: {current?.id}
                  </Typography>
                  <Typography>{current?.name}</Typography>
                  <Typography>{current && t[current.mode]}</Typography>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="text-red-500"
                    onClick={() => this.handleRemove(selected)}
                    textInherit
                  >
                    <MdDelete /> {t.remove}
                  </Button>
                </div>
              </div>
              <div>
                <Typography>{t.notSupportedYet}</Typography>
              </div>
            </TabBody>
          </TabController>
        )}
      </div>
    );
  }
}
