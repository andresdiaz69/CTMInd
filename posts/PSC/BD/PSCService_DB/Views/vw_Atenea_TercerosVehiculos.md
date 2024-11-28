# View: vw_Atenea_TercerosVehiculos

## Usa los objetos:
- [[spiga_Vehiculos]]
- [[vw_Atenea_Terceros]]

```sql


CREATE view [dbo].[vw_Atenea_TercerosVehiculos] as
select distinct Pkterceros,Nifcif,Nombre_completo,Telefono1,Telefono2,celular1 Celular,Direccion_principal,
       email_principal, ciudadPrincipal,Vin,Placa 
  from [dbo].[vw_Atenea_Terceros] t
  left join spiga_Vehiculos v on v.NumDocumentoPropietario = t.Nifcif

```
