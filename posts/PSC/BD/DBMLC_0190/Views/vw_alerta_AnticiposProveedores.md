# View: vw_alerta_AnticiposProveedores

## Usa los objetos:
- [[Empresas]]
- [[spiga_AnticiposProveedores]]

```sql








CREATE VIEW [dbo].[vw_alerta_AnticiposProveedores]
AS
SELECT        

[PSCService_DB].dbo.spiga_AnticiposProveedores.Ano_Periodo, 
[PSCService_DB].dbo.spiga_AnticiposProveedores.Mes_Periodo, 
dbo.Empresas.CodigoEmpresa, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa, 

[PSCService_DB].dbo.spiga_AnticiposProveedores.IdTerceros AS CodigoTercero, 
MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.NombreTercero) + ' ' + ISNULL(MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.Apellido1), '') + ' ' + ISNULL(MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.Apellido2), '') AS NombreTercero,
CAST([PSCService_DB].dbo.spiga_AnticiposProveedores.IdTerceros AS NVARCHAR(10)) + ' - ' + MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.NombreTercero) + ' ' + ISNULL(MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.Apellido1), '') + ' ' + ISNULL(MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.Apellido2), '') AS TerceroCompleto,

[PSCService_DB].dbo.spiga_AnticiposProveedores.IdCentros AS CodigoCentro, 
MAX([PSCService_DB].dbo.spiga_AnticiposProveedores.Centro) AS NombreCentro,

SUM([PSCService_DB].dbo.spiga_AnticiposProveedores.ImportePendienteVincular) AS SaldoPendientePorVincular

FROM            [PSCService_DB].dbo.spiga_AnticiposProveedores LEFT OUTER JOIN
                         dbo.Empresas ON [PSCService_DB].dbo.spiga_AnticiposProveedores.IdEmpresas = dbo.Empresas.CodigoEmpresa

WHERE IdReciboEstados IN ('PV', 'S')

GROUP BY 
Ano_Periodo, 
Mes_Periodo,
CodigoEmpresa,  
NombreEmpresa,
SiglaEmpresa, 
IdTerceros,
IdCentros

```
