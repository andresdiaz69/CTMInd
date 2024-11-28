# View: vw_InformesDefinitivos

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedes]]

```sql




create VIEW [dbo].[vw_InformesDefinitivos]
AS
SELECT        Consulta.CodigoPresentacion, Consulta.NombrePresentacion,Consulta.Balance, Consulta.Año, Consulta.Mes, 
Consulta.CodigoConcepto, Consulta.NombreConcepto, Sedes.CodigoSede, Consulta.Sede, Consulta.Valor,a.Orden 
FROM            (SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede1 AS Sede, i.Actual1 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                    dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede2 AS Sede, i.Actual2 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede3 AS Sede, i.Actual3 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede4 AS Sede, i.Actual4 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede5 AS Sede, i.Actual5 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede6 AS Sede, i.Actual6 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede7 AS Sede, i.Actual7 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede8 AS Sede, i.Actual8 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede9 AS Sede, i.Actual9 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede10 AS Sede, i.Actual10 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede11 AS Sede, i.Actual11 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede12 AS Sede, i.Actual12 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede13 AS Sede, i.Actual13 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede14 AS Sede, i.Actual14 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede15 AS Sede, i.Actual15 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede16 AS Sede, i.Actual16 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede17 AS Sede, i.Actual17 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede18 AS Sede, i.Actual18 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede19 AS Sede, i.Actual19 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede20 AS Sede, i.Actual20 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede21 AS Sede, i.Actual21 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede22 AS Sede, i.Actual22 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede23 AS Sede, i.Actual23 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede24 AS Sede, i.Actual24 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)
                          UNION ALL
                          SELECT        i.CodigoPresentacion, i.Año2 AS Año, i.MesFinal2 AS Mes, i.Balance, i.CodigoConcepto, i.NombreConcepto, i.Sede25 AS Sede, i.Actual25 AS Valor, p.NombrePresentacion
                          FROM            dbo.InformesDefinitivos AS i LEFT OUTER JOIN
                                                   dbo.InformesPresentaciones AS p ON i.CodigoPresentacion = p.CodigoPresentacion
                          WHERE        (i.MesFinal1 <> i.MesFinal2)) AS Consulta 
		LEFT OUTER JOIN
        (SELECT ps.Orden, ps.CodigoPresentacion, ps.CodigoSede, s.NombreSede
         FROM dbo.InformesPresentacionesSedes AS ps 
		 LEFT OUTER JOIN
         dbo.InformesSedes AS s ON ps.CodigoSede = s.CodigoSede) AS Sedes ON Consulta.CodigoPresentacion = Sedes.CodigoPresentacion AND Consulta.Sede = Sedes.NombreSede
		 LEFT OUTER JOIN
		 dbo.InformesArboles as a ON Consulta.Balance = a.Balance and Consulta.CodigoConcepto = a.CodigoConcepto 

WHERE        (Consulta.Sede <> '')

```
