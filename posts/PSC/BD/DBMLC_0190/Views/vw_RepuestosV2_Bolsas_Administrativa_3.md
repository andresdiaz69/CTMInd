# View: vw_RepuestosV2_Bolsas_Administrativa_3

## Usa los objetos:
- [[Cargos]]
- [[ExogenasBolsasCargos]]
- [[ExogenasBolsasMarcasCentros]]
- [[vw_RepuestosV2_Bolsas_Administrativa_1]]
- [[vw_RepuestosV2_Bolsas_Administrativa_2]]
- [[vw_RepuestosV2_Bolsas_Administrativa_Especialista_1]]

```sql






CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_3]
AS
SELECT        dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoEmpleado, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Empleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.FechaRetiro, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoEmpresa, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.NombreEmpresa, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.NombreCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.cod_marca, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.nombre_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Administrativa_1.NombreCentro, ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_2.CantidadEmpleados, 0) 
                         AS CantidadEmpleados, 
						 
						 CASE 
						 WHEN dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCargo IN (SELECT [CodigoCargo] FROM [Cargos] WHERE AplicaBolsaEspecialistas = 1) THEN ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.TopeMaximoBolsaEspecialista_Taller, 0) -- ESPECIALISTA DE TALLER
						 WHEN dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCargo IN (SELECT [CodigoCargo] FROM [Cargos] WHERE AplicaBolsaEspecialistasColision = 1) THEN ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.TopeMaximoBolsaEspecialista_Colision, 0) -- ESPECIALISTA DE COLISION					 
						 ELSE ISNULL(dbo.ExogenasBolsasCargos.TopeMaximoBolsa, 0) 
						 END AS TopeMaximoBolsa, 

                         ISNULL(dbo.ExogenasBolsasCargos.PesoAsignadoBolsa, 0) AS PesoAsignadoBolsa, 
						 ISNULL(dbo.vw_RepuestosV2_Bolsas_Administrativa_2.CantidadEmpleados, 0) * ISNULL(dbo.ExogenasBolsasCargos.PesoAsignadoBolsa, 0) AS PesoTotal, 
						 ISNULL(dbo.ExogenasBolsasMarcasCentros.ValorBolsa, 0) AS ValorBolsa, ISNULL(dbo.ExogenasBolsasMarcasCentros.Faltantes, 0) AS Faltantes, 
                         ISNULL(dbo.ExogenasBolsasMarcasCentros.PesoBolsaOtroCargo, 0) AS PesoBolsaOtroCargo

FROM            dbo.vw_RepuestosV2_Bolsas_Administrativa_1 LEFT OUTER JOIN
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1 ON dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoEmpresa = dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.CodigoEmpresa AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCentro = dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.CodigoCentro AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Ano_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.Ano_Periodo AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Mes_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_2 ON dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCentro = dbo.vw_RepuestosV2_Bolsas_Administrativa_2.codigo_centro AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Mes_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_2.Mes_Periodo AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Ano_Periodo = dbo.vw_RepuestosV2_Bolsas_Administrativa_2.Ano_Periodo LEFT OUTER JOIN
                         dbo.ExogenasBolsasMarcasCentros ON dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Mes_Periodo = dbo.ExogenasBolsasMarcasCentros.Mes AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCentro = dbo.ExogenasBolsasMarcasCentros.CodigoCentro AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Ano_Periodo = dbo.ExogenasBolsasMarcasCentros.Ano LEFT OUTER JOIN
                         dbo.ExogenasBolsasCargos ON dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Mes_Periodo = dbo.ExogenasBolsasCargos.Mes AND 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_1.Ano_Periodo = dbo.ExogenasBolsasCargos.Ano AND dbo.vw_RepuestosV2_Bolsas_Administrativa_1.CodigoCargo = dbo.ExogenasBolsasCargos.CodigoCargo

```
