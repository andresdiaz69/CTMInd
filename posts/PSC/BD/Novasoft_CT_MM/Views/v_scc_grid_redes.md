# View: v_scc_grid_redes

## Usa los objetos:
- [[SCC_RedesSociales]]

```sql

 /* =============================================
    Author:		 <OLIVIA ROMERO>
    Description: <Vista para presentar grid del Maestro de redes sociales según datos del encabezado del maestro >
    Modificado:  <21 Jul 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_scc_grid_redes]
AS

SELECT NroFormato,NitDeCliente,NombreRedSocial,UrlRedSocial,IdRedSocial,NicknameRedSocial,Polaridad,Clasificacion,ScreenNameAutor,
       UsuarioMencionado,MensajeRedSocial,CONVERT(VARCHAR(10),FechaYHora,103) AS Fecha,CONVERT(VARCHAR(12),FechaYHora,114) AS Hora,NroRSS,NroSCC,Estado
FROM SCC_RedesSociales;


```
