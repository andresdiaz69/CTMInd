# View: vw_alerta_AnticiposClientesPendientes

## Usa los objetos:
- [[Empresas]]
- [[spiga_AnticiposClientesPendientes]]

```sql



CREATE VIEW [dbo].[vw_alerta_AnticiposClientesPendientes]
AS
SELECT        PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Ano_Periodo, PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Mes_Periodo, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
                         dbo.Empresas.SiglaEmpresa, 
						 
						 PSCService_DB.dbo.spiga_AnticiposClientesPendientes.CodTercero AS CodigoTercero, 
						 MAX(PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Tercero) AS NombreTercero, 
						 CAST(PSCService_DB.dbo.spiga_AnticiposClientesPendientes.CodTercero AS NVARCHAR(10)) + ' - ' +  MAX(PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Tercero) AS TerceroCompleto,
						 
                         PSCService_DB.dbo.spiga_AnticiposClientesPendientes.CodCentro AS CodigoCentro, MAX(PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Centro) AS NombreCentro, 
                         SUM(PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Diferencia) AS SaldoPendientePorVincular
FROM            PSCService_DB.dbo.spiga_AnticiposClientesPendientes LEFT OUTER JOIN
                         dbo.Empresas ON PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Empresa = dbo.Empresas.CodigoEmpresa

						 WHERE       (PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Estado IN ('Parcialmente vinculado', 'Pagado/Cobrado'))
						
GROUP BY 

PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Ano_Periodo, 
PSCService_DB.dbo.spiga_AnticiposClientesPendientes.Mes_Periodo, 
dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa, 
PSCService_DB.dbo.spiga_AnticiposClientesPendientes.CodTercero, 
PSCService_DB.dbo.spiga_AnticiposClientesPendientes.CodCentro

 


```
