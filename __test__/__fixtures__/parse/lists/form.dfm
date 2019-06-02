object ListForm: TForm
  Options = [
    dgTitles,
    dg_Indicator, dgColumnResize,
    dgColLines, dgRowLines,
    dgTabs, dgRowSelect,
    dgConfirmDelete,
    dgCancelOnExit
  ]
  EmptyOptions = []
  Strings = ( 'this is string.'
        'and another one...'
      + 'and another one...'
      + 'now with apostrophe '''#13#10'how fancy'
      )
  Variants = (
    255
    255
    255
    True
    'Hello World!'
    45e22)
  EmptyVariants = ()
  Items = <
    item
      Expanded = False
      Visible = True
    end
    item
    end
    item
      Expanded = False
      Visible = True
    end>
  EmptyItems = <>
  BinaryData = {
      07544269746D617036550000424D365500000000000036000000280000005500
      000055000000010018000000000000550000C40E0000C40E0000000000000000
    }
  EmptyBinaryData = {}
end