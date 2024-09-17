#!/usr/bin/python3
"""Defines the console class."""

import cmd

from backend.app.models import storage
from backend.app.models.user import User
from backend.app.models.notification import Notification
from backend.app.models.incident import Incident
from backend.app.models.adminLog import AdminLog
from backend.app.models.settings import Settings
from backend.app.models.dbase import Dbase
import re


def parse(args):
    """Parses arguments into a list of strings"""
    curly_braces = re.search(r"\{(.*?)\}", args)
    brackets = re.search(r"\[(.*?)\]", args)
    if curly_braces is None:
        if brackets is None:
            return [i.strip(",") for i in args.split()]
        else:
            lexer = args[:brackets.span()[0]].split()
            retl = [i.strip(",") for i in lexer]
            retl.append(brackets.group())
            return retl

    else:
        lexer = args[:curly_braces.span()[0]].split()
        retl = [i.strip(",") for i in lexer]
        retl.append(curly_braces.group())
        return retl


class Command(cmd.Cmd):
    """Defines the command interpreter
    """

    prompt = "(SesureSide) "
    __classes = {
        "User",
        "Notification",
        "Incident",
        "AdminLog",
        "Settings",
        "Dbase"
    }

    def emptyline(self):
        """Do nothing"""
        pass

    def default(self, arg):
        """Default behaviour when input is invalid or unknown"""
        argdict = {
            "all": self.do_all,
            "show": self.do_show,
            "destroy": self.do_destroy,
            "update": self.do_update,
            "create": self.do_create,
            "count": self.do_count
        }

        match = re.search(r"\((.*?)\)", arg)
        if match:
            class_name, method_call = arg.split(".", 1)
            match = re.search(r"\((.*?)\)", method_call)
            if match:
                command, args = method_call.split("(", 1)
                args = args.rstrip(")")
                if command in argdict:
                    call = f"{class_name} {args}"
                    return argdict[command](call)
        print(f"** Unknown syntax: {arg}")
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True

    def do_EOF(self, arg):
        """EOF signal to exit the program."""
        print("")
        return True

    def do_create(self, line):
        """Usage:
            create <class> <key 2>=<value> <key 2>=<value 2>...
            Create a new class instance with given keys/values and print its id
        """
        try:
            if not line:
                raise SyntaxError()
            list = line.split(" ")

            kwargs = {}
            for j in range(1, len(list)):
                k, v = tuple(list[j].split("="))
                if v[0] == '"':
                    v = v.strip('"').replace("_", " ")
                else:
                    try:
                        v = eval(v)
                    except (SyntaxError, NameError):
                        continue
                kwargs[k] = v

            if kwargs == {}:
                obj = eval(list[0])()
            else:
                obj = eval(list[0])(**kwargs)
                storage.new(obj)
            print(obj.id)
            obj.save()

        except SyntaxError:
            print("** class name missing **")
        except NameError:
            print("** class doesn't exist **")

    def do_show(self, arg):
        """Usage: show <class><id> or <class>.show(<id>)"""
        argl = parse(arg)
        objdict = storage.all()
        if len(argl) == 0:
            print("** class name missing **")
            return False
        elif argl[0] not in Command.__classes:
            print("** class doesn't exist **")
            return False
        elif len(argl) == 1:
            print("** instance id missing **")
            return False
        elif "{}.{}".format(argl[0], argl[1]) not in objdict:
            print("** no instance found **")
            return False
        else:
            print(objdict["{}.{}".format(argl[0], argl[1])])

    def do_destroy(self, arg):
        """Usage: destroy <class> <id> or <class>.destroy(<id>)
        Deletes an instance based on the class name and id
        """
        argl = parse(arg)
        objdict = storage.all()
        if len(argl) == 0:
            print("** class name missing **")
            return False
        elif argl[0] not in Command.__classes:
            print("** class doesn't exist **")
            return False
        elif len(argl) == 1:
            print("** instance id missing **")
            return False
        elif "{}.{}".format(argl[0], argl[1]) not in objdict.keys():
            print("** no instance found **")
            return False
        else:
            objdict.pop("{}.{}".format(argl[0], argl[1]))
            storage.save()

    def do_all(self, arg):
        """Usage: all or all <class> or <class>.all()
        Display string rep of all instances of a given class.
        If no class is specified, display all instatiated objects."""
        if not arg:
            o = storage.all()
            print([o[k].__str__() for k in o])
            return
        try:
            args = arg.split(" ")
            if args[0] not in self.__classes:
                raise NameError()

            o = storage.all(eval(args[0]))
            print([o[k].__str__() for k in o])

        except NameError:
            print("** class doesn't exist **")

    def do_count(self, arg):
        """Usage : count <class> or <class>.count()
        Retrieve the number of instances of a given class."""
        argl = parse(arg)
        count = 0
        for obj in storage.all().values():
            if argl[0] == obj.__class__.__name__:
                count += 1
        print(count)

    def do_update(self, arg):
        """Usage: update <class> <id> <attribute_name> <attribute_value> or
        <class>.update(<id>, <attribute_name>, <atribute_value>) or
        <class>.update(<id, <dictionary>)
        Update a class instance of a given id by adding or updating
        a given attribute ."""
        argl = parse(arg)
        objdict = storage.all()

        if len(argl) == 0:
            print("** class name missing **")
            return False
        if argl[0] not in Command.__classes:
            print("** class doesn't exist **")
            return False
        if len(argl) == 1:
            print("** instance id missing **")
            return False
        if "{}.{}".format(argl[0], argl[1]) not in objdict.keys():
            print("** no instance found **")
            return False
        if len(argl) == 2:
            print("** attribute name missin **")
            return False
        if len(argl) == 3:
            try:
                type(eval(argl[2])) != dict
            except NameError:
                print("** vlaue missing **")
                return False

        if len(argl) == 4:
            obj = objdict["{}.{}".format(argl[0], argl[1])]
            if argl[2] in obj.__class__.__dict__.keys():
                valtype = type(obj.__class__.__dict__[argl[2]])
                obj.__dict__[argl[2]] = valtype(argl[3])
            else:
                obj.__dict__[argl[2]] = argl[3]
        elif type(eval(argl[2])) == dict:
            for k, v in eval(argl[2]).items():
                if (k in obj.__class__.__dict__keys() and
                        type(obj.__class__.__dict__[k]) in {str, int, float}):
                    valtype = type(obj.__class__.__dict__[k])
                else:
                    obj.__dict__[k] = v
        storage.save()


if __name__ == '__main__':
    Command().cmdloop()
