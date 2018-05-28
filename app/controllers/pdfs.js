
const db    = require('../../config/database')
var fonts = {
        Roboto: {
            normal: __dirname +'/../assets/fonts/pdfmake/Roboto-Regular.ttf',
            bold: __dirname+'/../assets/fonts/pdfmake/Roboto-Medium.ttf',
            italics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf',
            bolditalics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf'
        }
    };
var pdfmake = require('pdfmake');
var PdfPrinter = require(__dirname + '/../../node_modules/pdfmake/src/printer');
var printer = new PdfPrinter(fonts);

module.exports={
    NotaSeguimiento: (data, res)=>{
        var dd = {
            content:[
                {
                    columns: [
                        {
                          image: __dirname + '/../assets/images/salud.jpg',
                          width: 150,
                          height: 60,
                          alignment: 'center',
                        },
                        {
                          image: __dirname + '/../assets/images/uneme.jpg',
                          width: 150,
                          height: 70,
                          alignment: 'center',
                        },
                        {
                          image: __dirname + '/../assets/images/guerrero.jpg',
                          width: 150,
                          height: 60,
                          alignment: 'center',
                        }
                    ]
                },
                {
                    columns: [
                      {
                          text: [
                          '',{
                            text:'"UNEME-CAPA CHILPANCINGO"', alignment: 'center', bold: true
                          },
                        ]}
                    ]
                },
                {
                  text: `\n\nNOTAS DE SEGUIMIENTO\n\n`,
                  style: 'subheader',
                  alignment: 'center',
                  bold: true
                },
                {
                  text: `CENTRO: `,
                  style: 'subheader',
                  alignment: 'left'
                },
                {
                  text: [
                        '\n NOMBRE DEL USUARIO:    ',
                        {text:data.Nombre},
                        '                                       No. DE EXPEDIENTE:   ',
                        {text:data.NumeroExpediente},
                        '\n\n EDAD: ',
                        {text: data.Edad + " años"},
                        '         SEXO: ',
                        {text:data.SexoPaciente},
                        '      DROGA DE MAYOR IMPACTO: ',
                        {text: '_________________________'},
                        '\n\nFECHA DE INGRESO: ',
                        {text: '____________________'},
                        '                  DX DE INGRESO: ',
                        {text: '___________________________'},
                        '\n\nRELACIÓN SOCIAL: ',
                        {text: '_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________'},
                        '\n\nFECHA: ',
                        {text:data.FechaNota},
                        '                          HORA: ',
                        {text:data.HoraNotaSeguimiento},
                        '\n\nRESUMEN: ',
                        {text:data.ResumenNotaSeguimiento},
                        '\n\nDIAGNÓSTICO: ',
                        {text:data.DiagnosticoNotaSeguimiento},
                        '\n\nPRONÓSTICO: ',
                        {text:data.PronosticoNotaSeguimiento},
                  ]
                },
                {
                  text: `\n\n\n\n\n\n________________________________________________\n`,
                  style: 'subheader',
                  alignment: 'center',
                  bold: true
                },
                {
                  text: `NOMBRE Y FIRMA DE LA TRABAJADORA SOCIAL`,
                  style: 'subheader',
                  alignment: 'center',
                  bold: false
                },
                ],
                style: {
                   header: {
                     fontSize: 15,
                     bold: true,
                     margin:[0, 0, 0, 0]
                   }
                },
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
      pdfDoc.end();
    },

    NotaTratamiento: (data, res)=>{
        var dd = {
            content:[
                {
                    columns: [
                        {
                          image: __dirname + '/../assets/images/salud.jpg',
                          width: 150,
                          height: 60,
                          alignment: 'left',
                        },
                        {
                          image: __dirname + '/../assets/images/uneme.jpg',
                          width: 150,
                          height: 70,
                          alignment: 'right',
                        },
                    ]
                },
                {
                    columns: [
                      {
                          text: [
                          '',{
                            text:'\n\nUNIDAD DE ESPECIALIDAD MEDICA-CENTRO DE ATENCIÓN PRIMARIA EN ADICCIONES\n', alignment: 'center', bold: true,
                          },
                          {
                            text:'Nota de Tratamiento\n\n', alignment: 'center', bold: true
                          },
                        ]}
                      ]
                },
                {
                style: 'table',
                table: {
                    widths: [50, 50, 50, 50, 50,40,40,50,50,50],
                    body: [
                        [
                        {
                            colSpan: 5,
                            text: [
                                    {
                                        text: 'Nombre del paciente:    ',
                                    },
                                    data.Nombre || ''
                                ]
                            },
                            {},{},{},{},
                            {
                                colSpan: 4,
                                text: [
                                    {
                                        text: 'No. De expediente:    ',
                                    },
                                    data.NumeroExpediente || ''
                                ]
                            },{},{},{},
                        ],
                        [
                        {
                            colSpan: 5,
                            text: [
                                    {
                                        text: 'Edad:                                ',
                                    },
                                    data.Edad+" años" || ''
                                ]
                            },
                            {},{},{},{},
                            {
                                colSpan: 4,
                                text: [
                                    {
                                        text: 'Sexo:                            ',
                                    },
                                    data.SexoPaciente || '',
                                ]
                            },{},{},{},
                        ],
                        [
                        {
                            colSpan: 5,
                            text: [
                                    {
                                        text: 'Fecha:                               ',
                                    },
                                    data.FechaNota || ''
                                ]
                            },
                            {},{},{},{},
                            {
                                colSpan: 4,
                                text: [
                                    {
                                        text: 'Hora:                            ',
                                    },
                                    data.HoraInicioNotaTratamiento || ''
                                ]
                            },{},{},{},
                        ],
                    ]

                  }
                },
                {
                    columns: [
                      {
                          text: [
                          '',{
                            text:'\n\n1.- Servicio Otorgado\n', alignment: 'left'
                          },
                        ]}
                      ]
                },
                {
                style: 'table',
                table: {
                    widths: [30,30,30,30,30,30,12,30,30,30,30,30,30,12],
                    body: [
                        [
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Consulta de primera vez    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Tratamiento    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        ],
                        [
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Tratamiento individual    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Tratamiento grupal    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        ],
                        [
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Tratamiento familiar individual    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        {
                            colSpan: 6,
                            alignment: 'center',
                            text: [
                                    {
                                        text: 'Tratamiento familiar grupal    ',
                                    },
                                ]
                            },
                            {},{},{},{},{},
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        text: ' ',
                                    },
                                ]
                            },
                        ],
                    ]

                  }
                },
                {
                    columns: [
                      {
                          text: [
                          '',{
                            text:'\n\n',
                          },
                        ]}
                      ]
                },
                {
                  style: 'table',
                  table: {
                      widths: [500],
                      body: [
                          [
                          {
                              text: [
                                      {
                                          text: 'Nota: Indicar dentro del cuerpo de la nota impresión del usuario, objetivo, avances, resumen de la sesión, plan de tratamiento, tema a trabajar la próxima sesión. \n\nResumen:    \n',
                                      },
                                      data.ResumenNotaTratamiento + "\n\n\n\n\n\n\n\n\n\n"|| ''
                                  ]
                              },
                          ],
                          [
                          {
                              text: [
                                      {
                                          text: 'Diagnostico:                                \n',
                                      },
                                      data.DiagnosticoNotaTratamiento || ''
                                  ]
                              },
                          ],
                          [
                          {
                              text: [
                                      {
                                          text: 'Pronóstico:                              \n ',
                                      },
                                      data.PronosticoNotaTratamiento || ''
                                  ]
                              },
                          ],
                      ]

                    }
                },
                {
                  text: [
                        '\n\n Próxima cita:    ',
                        '\n Día: ',
                        {text:'_______'},
                        '     Hora: ',
                        {text:'_______'},
                        '     Servicio: ',
                        {text: '__________'},
                        '     Responsable: ',
                        {text:'_____________________________'},
                  ]
                },
                {
                  text: [
                        '\n\n\n',
                        'Nombre de quien otorgó el servicio: ',
                        {text:'__________________________________________________________'},
                        '\nFirma: ',
                        {text:'_________________________'},
                        '     Hora: ',
                        {text: '_______________'},
                        '\nCédula profesional: ',
                        {text:'____________________________________'},
                  ]
                },
                ],
                style: {
                   header: {
                     fontSize: 15,
                     bold: true,
                     margin:[0, 0, 0, 0]
                   }
                },
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
      pdfDoc.end();
    },
    Egreso: (data, res)=>{
        var dd = {
            content:[
                {
                    columns: [
                        {
                          image: __dirname + '/../assets/images/salud.jpg',
                          width: 150,
                          height: 60,
                          alignment: 'center',
                        },
                        {
                          image: __dirname + '/../assets/images/comision.jpg',
                          width: 150,
                          height: 60,
                          alignment: 'center',
                        },
                        {
                          image: __dirname + '/../assets/images/uneme.jpg',
                          width: 150,
                          height: 70,
                          alignment: 'center',
                        }
                    ]
                },
                {
                    columns: [
                      {
                          text: [
                          '',{
                            text:'HOJA DE EGRESO', alignment: 'center', bold: true
                          },
                        ]}
                    ]
                },
                {
                  text: [
                        '\n Nombre del usuario:   ',
                        {text:data.Nombre},
                        '                    Número de expediente: ',
                        {text:data.NumeroExpediente},
                        '\n\n Sexo: ',
                        {text: 'M____ H____'},
                        '         Fecha: ',
                        {text:'___________'},
                        '         Hora: ',
                        {text:'___________ \n\n'},
                  ]
                },
                {
                  style: 'table',
                  table: {
                      widths: [507],
                      body: [
                          [
                          {
                              text: [
                                      {
                                          text: '1.- Tipo egreso:',
                                      },
                                  ]
                              },
                          ],
                      ]

                    }
                },
                {
                style: 'table',
                table: {
                    widths: [120, 120, 120, 120],
                    body: [
                        [

                        {
                            colSpan: 1,
                            text: [
                                    {
                                        alignment: 'center',
                                        text: 'Alta por término de tratamiento ____ ',
                                    },
                                    {
                                        text: '\n\nCon mejoría __ ',
                                    },
                                    {
                                        text: '\n\nSin mejoría __ ',
                                    },
                                ]
                            },
                            {
                                colSpan: 1,
                                alignment: 'center',
                                text: [
                                    {
                                        text: ' Alta por mejoría',
                                    },
                                ]
                            },
                        {
                            colSpan: 1,
                            text: [
                                    {
                                        alignment: 'center',
                                        text: 'Alta voluntaria ____ ',
                                    },
                                    {
                                        text: '\n\nCon mejoría __ ',
                                    },
                                    {
                                        text: '\n\nSin mejoría __ ',
                                    },
                                ]
                            },
                            {
                                colSpan: 1,
                                text: [
                                    {
                                        alignment: 'center',
                                        text: 'Baja ____ ',
                                    },
                                    {
                                        text: '\nCon mejoría __ ',
                                    },
                                    {
                                        text: '\nSin mejoría __ ',
                                    },
                                    {
                                        text: '\n______________________ ',
                                    },
                                    {
                                        text: 'No requiere tratamiento ____ ',
                                    },
                                ]
                            },
                        ],
                      ]
                    }
                },
                {
                  text: [
                        '\n\n',
                  ]
                },
                {
                  style: 'table',
                  table: {
                      widths: [508],
                      body: [
                          [
                          {
                              text: [
                                      {
                                          text: '2.- Fase en la que ocurre el egreso:',
                                      },
                                  ]
                              },
                          ],
                          [
                          {
                              text: [
                                      {
                                          text: 'Fase diagnóstica ____       Tratamiento y reinserción social ____ ',
                                      },
                                  ]
                              },
                          ],
                      ]

                    }
                },
                {
                  text: [
                        '\n\n',
                  ]
                },
                {
                  style: 'table',
                  table: {
                      widths: [508],
                      body: [
                          [
                          {
                              text: [
                                      {
                                          text: '3.- Motivo del egreso: \n' + data.MotivoEgreso + '\n\n',
                                      },
                                  ]
                              },
                          ],
                      ]

                    }
                },
                {
                  text: [
                        '\n\n',
                  ]
                },
                {
                  style: 'table',
                  table: {
                      widths: [508],
                      body: [
                          [
                          {
                              text: [
                                      {
                                          text: '4.- Resumen del tratamiento:  \n ' + data.ResumenEgreso + ' \n\n',
                                      },
                                      {
                                          text: '5.- Impresión diagnóstica:  \n ' + data.ImpresionDiagnosticaEgreso + ' \n\n',
                                      },
                                      {
                                          text: '6.- Pronóstico del egreso:  \n ' + data.PronosticoEgreso + ' \n\n',
                                      },
                                      {
                                          text: '7.- Sugerencias terapéuticas y condiciones al egresar:  \n ' + data.SugerenciasEgreso + ' \n\n',
                                      },
                                      {
                                          text: '8.- Observaciones:  \n ' + data.ObservacionesEgreso + ' \n\n',
                                      },
                                  ]
                              },
                          ],
                      ]

                    }
                },
                {
                  text: [
                        '\n\n\n',
                        'Nombre de la UNEME-CAPA:   CHILPANCINGO ',
                        '\nNombre de quien redactó el informe de egreso: ',
                        {text:'_____________________________________________'},
                        '\nFirma: ',
                        {text:'_________________________'},
                        '   Cédula profesional: ',
                        {text:'____________________________________'},
                  ]
                },
                ],
                style: {
                   header: {
                     fontSize: 15,
                     bold: true,
                     margin:[0, 0, 0, 0]
                   }
                },
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
      pdfDoc.end();
    },
}
