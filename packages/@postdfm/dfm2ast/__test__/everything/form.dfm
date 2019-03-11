object Form1: TForm1
  Left = 192
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  object Image1: TImage
    Picture.Data = {
      07544269746D617036550000424D365500000000000036000000280000005500
      000055000000010018000000000000550000C40E0000C40E0000000000000000
    }
    Picture.MoreData = {}
  end
  inherited ListBox1: TListBox [2]
    Items.Strings =
      ( 'this is string.'
        'and another one...'
      + 'and another one...'
      + 'now with apostrophe '''#13#10
      )
    Items.MoreStrings = ()
  end
  object DBGrid1: TDBGrid
    Options = [dgTitles, dgIndicator, dgColumnResize, dgColLines, dgRowLines, dgTabs, dgRowSelect, dgConfirmDelete, dgCancelOnExit]
    MoreOptions = []
    Columns = <
      item
        Expanded = False
        Visible = True
      end
      item
        Expanded = False
        Visible = True
      end>
    MoreColumns = <>
  end
  inline Edit1: TEdit
    MaxLength = 6e20
    MinLength = -20e1
    SomeOtherLength = 45.333e20
    Color = $FF0000
  end
  object SubForm: TForm2
    inline SubEdit: TEdit
      Value = ''
    end
  end
  object Nothing: TNothing
  end
end
