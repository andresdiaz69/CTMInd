# View: v_RecaudoAnticipos

## Usa los objetos:
- [[spiga_AnticiposClientesPendientes]]
- [[vw_Centros_Marca]]

```sql

CREATE VIEW [dbo].[v_RecaudoAnticipos] AS
SELECT Año,mes,dia,empresa,marca,valor = SUM(diferencia)
FROM(
SELECT DISTINCT r.Empresa, u.marca, 

-- Año = YEAR(r.FechaAlta), Mes = MONTH(r.FechaAlta), dia = DAY(r.FechaAlta), JCS: 20/12/2022 SACABA UN ERROR DE CONVERSIÓN DE FECHA
Año = YEAR(CONVERT( DATETIME, r.FechaAlta, 103)), Mes = MONTH(CONVERT( DATETIME, r.FechaAlta, 103)), dia = DAY(CONVERT( DATETIME, r.FechaAlta, 103)), -- JCS: 20/12/2022 PARA VALIDAR EL FORMATO PQ VIENE DD/MM/YYYY

Diferencia
FROM [PSCService_DB].dbo.spiga_AnticiposClientesPendientes r
LEFT JOIN [vw_Centros_Marca] u ON r.CodCentro = u.CodigoCentro 
--where r.Ano_Periodo=2020
--and r.Mes_Periodo = 6
) a GROUP BY Año,mes,dia,empresa,marca

```
