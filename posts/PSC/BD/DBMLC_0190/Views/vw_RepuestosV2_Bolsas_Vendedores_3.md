# View: vw_RepuestosV2_Bolsas_Vendedores_3

## Usa los objetos:
- [[ExogenasBolsasCargos]]
- [[ExogenasBolsasMarcasCentros]]
- [[vw_RepuestosV2_Bolsas_Vendedores_1]]
- [[vw_RepuestosV2_Bolsas_Vendedores_2]]

```sql

CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Vendedores_3] AS
SELECT *,
CASE 
WHEN ValorBolsaVendedor < TopeMaximoBolsa THEN ValorBolsaVendedor
ELSE TopeMaximoBolsa
END AS
Comision
 FROM
(
SELECT        vw_RepuestosV2_Bolsas_Vendedores_1.Ano_Periodo, vw_RepuestosV2_Bolsas_Vendedores_1.Mes_Periodo, vw_RepuestosV2_Bolsas_Vendedores_1.CodigoEmpresa, 
                         vw_RepuestosV2_Bolsas_Vendedores_1.CedulaVendedorRepuestos, vw_RepuestosV2_Bolsas_Vendedores_1.CodigoEmpleado, vw_RepuestosV2_Bolsas_Vendedores_1.Empleado, 
                         vw_RepuestosV2_Bolsas_Vendedores_1.FechaRetiro, ISNULL(vw_RepuestosV2_Bolsas_Vendedores_1.ValorBaseComision, 0) AS ValorBaseComision, ISNULL(vw_RepuestosV2_Bolsas_Vendedores_2.ValorBaseTotal, 0) 
                         AS ValorBaseTotal, vw_RepuestosV2_Bolsas_Vendedores_1.CodigoCentro, vw_RepuestosV2_Bolsas_Vendedores_1.NombreCentro, vw_RepuestosV2_Bolsas_Vendedores_1.cod_marca, 
                         vw_RepuestosV2_Bolsas_Vendedores_1.nombre_marca, vw_RepuestosV2_Bolsas_Vendedores_1.CodigoCargo, vw_RepuestosV2_Bolsas_Vendedores_1.NombreCargo, 
                         vw_RepuestosV2_Bolsas_Vendedores_1.ValorBaseComision / vw_RepuestosV2_Bolsas_Vendedores_2.ValorBaseTotal * 100 AS Participacion, ISNULL(ExogenasBolsasMarcasCentros.ValorBolsa, 0) AS ValorBolsa, 
                         ISNULL(ExogenasBolsasMarcasCentros.Faltantes, 0) AS Faltantes, ISNULL(ExogenasBolsasMarcasCentros.PesoBolsaVendedor, 0) AS PesoBolsaVendedor, ISNULL(ExogenasBolsasCargos.TopeMaximoBolsa, 0) 
                         AS TopeMaximoBolsa, ((ISNULL(ExogenasBolsasMarcasCentros.ValorBolsa, 0) - ISNULL(ExogenasBolsasMarcasCentros.Faltantes / 2, 0)) * ISNULL(ExogenasBolsasMarcasCentros.PesoBolsaVendedor / 100, 0)) 
                         * (vw_RepuestosV2_Bolsas_Vendedores_1.ValorBaseComision / vw_RepuestosV2_Bolsas_Vendedores_2.ValorBaseTotal) AS ValorBolsaVendedor
FROM            vw_RepuestosV2_Bolsas_Vendedores_1 LEFT OUTER JOIN
                         ExogenasBolsasCargos ON vw_RepuestosV2_Bolsas_Vendedores_1.Mes_Periodo = ExogenasBolsasCargos.Mes AND vw_RepuestosV2_Bolsas_Vendedores_1.Ano_Periodo = ExogenasBolsasCargos.Ano AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.CodigoCargo = ExogenasBolsasCargos.CodigoCargo LEFT OUTER JOIN
                         ExogenasBolsasMarcasCentros ON vw_RepuestosV2_Bolsas_Vendedores_1.CodigoCentro = ExogenasBolsasMarcasCentros.CodigoCentro AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.Mes_Periodo = ExogenasBolsasMarcasCentros.Mes AND vw_RepuestosV2_Bolsas_Vendedores_1.Ano_Periodo = ExogenasBolsasMarcasCentros.Ano LEFT OUTER JOIN
                         vw_RepuestosV2_Bolsas_Vendedores_2 ON vw_RepuestosV2_Bolsas_Vendedores_1.nombre_marca = vw_RepuestosV2_Bolsas_Vendedores_2.nombre_marca AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.cod_marca = vw_RepuestosV2_Bolsas_Vendedores_2.cod_marca AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.NombreCentro = vw_RepuestosV2_Bolsas_Vendedores_2.NombreCentro AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.CodigoCentro = vw_RepuestosV2_Bolsas_Vendedores_2.CodigoCentro AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.Mes_Periodo = vw_RepuestosV2_Bolsas_Vendedores_2.Mes_Periodo AND 
                         vw_RepuestosV2_Bolsas_Vendedores_1.Ano_Periodo = vw_RepuestosV2_Bolsas_Vendedores_2.Ano_Periodo
)
AS VALOR_BOLSA_VENDEDOR
--where Ano_Periodo = 2023
--and Mes_Periodo = 10
--and  CedulaVendedorRepuestos In ('1000921791','1036622489','1036598765','1036674070','72231687','1076651310')
--vw_RepuestosV2_Bolsas_Vendedores_1.CodigoEmpresa

```
